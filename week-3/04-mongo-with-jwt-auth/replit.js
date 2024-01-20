require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const mySecret = process.env["JWT_SECRET"];
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);

// Middleware for parsing request bodies
app.use(bodyParser.json());

const PORT = 3000;
//admin
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
const User = mongoose.model("User", userSchema);

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});
const Course = mongoose.model("Course", courseSchema);

app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;
  const user = new Admin({ username, password });
  user.save();

  // Save the new admin to the database
  res.json({ message: "Admin created successfully" });
});

// POST /admin/signin Description: Logs in an admin account. Input Body: { username: 'admin', password: 'pass' } Output: { token: 'your-token' }

app.post("/admin/signin", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  try {
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign({ username }, mySecret);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/admin/courses", async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1]; // Extract token from 'Bearer <token>'

  try {
    console.log("Incoming headers:", req.headers);

    const decodedToken = jwt.verify(token, mySecret);
    const admin = await Admin.findOne({ username: decodedToken.username });
    if (!admin) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const course = new Course({ title, description, price, imageLink });
    course.save();

    res.status(201).json({
      message: "Course created successfully",
      courseId: course._id,
    });
  } catch (err) {
    console.error("Error creating course: ", err);
    res.status(500).json({ message: "Error creating course" });
  }
});

app.get("/admin/courses", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1]; // Extract token from 'Bearer <token>'
  try {
    const decodedToken = jwt.verify(token, mySecret);
    const admin = await Admin.findOne({ username: decodedToken.username });
    if (!admin) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const courses = await Course.find();
    res.json({ courses: courses });
  } catch (err) {
    console.error("Error fetching courses: ", err);
  }
});

//users
app.post("/users/signup", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save();

  // Save the new admin to the database
  res.json({ message: "User created successfully" });
});
//POST /users/signin Description: Logs in a user account. Input: { username: 'user', password: 'pass' } Output: { token: 'your-token' }
app.post("/users/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json({ token: jwt.sign({ username }, mySecret) });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
//GET /users/courses Description: Lists all the courses. Input: Headers: { 'Authorization': 'Bearer ' } Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
app.get("/users/courses", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1]; // Extract token from 'Bearer <token>'
  try {
    const decodedToken = jwt.verify(token, mySecret);
    const user = await User.findOne({ username: decodedToken.username });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const courses = await Course.find();
    res.json({ courses: courses });
  } catch (err) {
    console.error("Error fetching courses: ", err);
  }
});
//POST /users/courses/:courseId Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased. Input: Headers: { 'Authorization': 'Bearer ' } Output: { message: 'Course purchased successfully' }
app.post("/users/courses/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1]; // Extract token from 'Bearer <token>'
  try {
    const decodedToken = jwt.verify(token, mySecret);
    const user = await User.findOne({ username: decodedToken.username });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await User.updateOne(
      {
        username: user.username,
      },
      { $push: { purchasedCourses: courseId } },
    );
    res.json({ message: "Purchase Complete!" });
  } catch (err) {
    console.error("Error purchasing course: ", err);
    res.status(500).json({ message: "Error purchasing course" });
  }
});

//GET /users/purchasedCourses Description: Lists all the courses purchased by the user. Input: Headers: { 'Authorization': 'Bearer ' } Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
app.get("/users/purchasedCourses", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1]; // Extract token from 'Bearer <token>'
  try {
    const decodedToken = jwt.verify(token, mySecret);
    const user = await User.findOne({ username: decodedToken.username });
    const courses = await Course.find({
      _id: {
        $in: user.purchasedCourses,
      },
    });
    res.send({ courses });
  } catch (err) {
    res.status(500).json({ message: "Error fetching purchased courses" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
