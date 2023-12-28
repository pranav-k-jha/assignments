require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);
// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);
const PurchasedCourse = mongoose.model("PurchasedCourse", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
  PurchasedCourse,
};
