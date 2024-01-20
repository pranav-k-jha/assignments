require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const mySecret = process.env["JWT_SECRET"];

// User Routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save();

  res.json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
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

router.get("/courses", userMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses: courses });
  } catch (err) {
    console.error("Error fetching courses: ", err);
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.username;
  try {
    await User.updateOne(
      {
        username
      },
      { $push: { purchasedCourses: courseId } }
    );
    res.json({ message: "Purchase Complete!" });
  } catch (err) {
    console.error("Error purchasing course: ", err);
    res.status(500).json({ message: "Error purchasing course" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  try {
    // console.log(req);
    const user = req.user;
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

module.exports = router;
