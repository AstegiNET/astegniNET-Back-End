const express = require("express");
const router = express.Router();
const {
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");

router.route("/addCourse").post(protect, addCourse);
router.route("/getCourse/:id").get(getCourse);
router.route("deleteCourse/:id").delete(protect, deleteCourse);
router.route("updateCourse/:id").put(protect, updateCourse);

module.exports = router;
