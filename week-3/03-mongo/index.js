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

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});
const Course = mongoose.model("Course", courseSchema);

app.post("/admin/signup", (req, res) => {
  const { username, password } = req.body;
  const user1 = new Admin({ username, password });
  user1.save();

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
