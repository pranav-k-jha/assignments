const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index")
const router = Router();

// Admin Routes
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const user = new Admin({ username, password });
  user.save();

  res.json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body;

  try {
    const course = new Course({
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
    });

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

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses: courses });
  } catch (err) {
    console.error("Error fetching courses: ", err);
  }
});

module.exports = router;
