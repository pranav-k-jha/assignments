const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course, PurchasedCourse } = require("../db/index")

// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.save();
  
    res.json({ message: "User created successfully" });
});

router.get('/courses', userMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses: courses });
  } catch (err) {
    console.error("Error fetching courses: ", err);
  }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  try {
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

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    const purchasedCourses = await PurchasedCourse.find();
    res.send(purchasedCourses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching purchased courses" });
  }
});

module.exports = router