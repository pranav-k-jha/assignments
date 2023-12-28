require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const adminRouter = require("./routes/admin");
// const userRouter = require("./routes/user");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

// Middleware for parsing request bodies
app.use(bodyParser.json());
// app.use("/admin", adminRouter);
// app.use("/user", userRouter);

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
});
const User = mongoose.model("User", adminSchema);

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});
const Course = mongoose.model("Course", courseSchema);

const PurchasedCourse = mongoose.model("PurchasedCourse", courseSchema);

app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;
  const user = new Admin({ username, password });
  user.save();

  // Save the new admin to the database
  res.json({ message: "Admin created successfully" });
});

app.post("/admin/courses", async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  const { username, password } = req.headers;
  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const course1 = new Course({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
      });

      course1.save();

      res.status(201).json({
        message: "Course created successfully",
        courseId: course1._id,
      });
    }
  } catch (err) {
    console.error("Error creating course: ", err);
    res.status(500).json({ message: "Error creating course" });
  }
});

app.get("/admin/courses", async (req, res) => {
  const { username, password } = req.headers;
  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const courses = await Course.find();
    res.json({ courses: courses });
  } catch (err) {
    console.error("Error fetching courses: ", err);
  }
});

//users
/*  */
app.post("/users/signup", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save();

  // Save the new admin to the database
  res.json({ message: "User created successfully" });
});

app.get("/users/courses", async (req, res) => {
  const { username, password } = req.headers;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const courses = await Course.find();
    res.json({ courses: courses });
  } catch (err) {
    console.error("Error fetching courses: ", err);
  }
});

app.post("/users/courses/:courseId", async (req, res) => {
  const { username, password } = req.headers;
  const courseId = req.params.courseId;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const course = await PurchasedCourse.findOne({ _id: courseId });
    if (course) {
      return res.status(409).json({ message: "Course already purchased" });
    }
    const courseToPurchase = await Course.findOne({ _id: courseId });
    if (!courseToPurchase) {
      return res.status(404).json({ message: "Course not found" });
    }
    const purchasedCourse = new PurchasedCourse({
      ...courseToPurchase.toObject(),
      purchased: true,
    });

    await purchasedCourse.save();
    res.status(201).json({
      message: "Course purchased successfully",
      course: purchasedCourse,
    });
  } catch (err) {
    console.error("Error purchasing course: ", err);
    res.status(500).json({ message: "Error purchasing course" });
  }
});
/* 
POST /users/courses/:courseId Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased. Input: Headers: { 'username': 'username', 'password': 'password' } Output: { message: 'Course purchased successfully' }

GET /users/purchasedCourses Description: Lists all the courses purchased by the user. Input: Headers: { 'username': 'username', 'password': 'password' } Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] } */

app.get("/users/purchasedCourses", async (req, res) => {
  const { username, password } = req.headers;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const purchasedCourses = await PurchasedCourse.find();
    res.send(purchasedCourses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching purchased courses" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
