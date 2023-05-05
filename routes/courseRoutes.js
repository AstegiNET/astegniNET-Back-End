const express = require("express");
const router = express.Router();
const {
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const { isAdmin } = require("../middleware/authMiddleware");

router.route("/addCourse").post(isAdmin, addCourse);
router.route("/getCourse/:id").get(getCourse);
router.route("deleteCourse/:id").delete(isAdmin, deleteCourse);
router.route("updateCourse/:id").put(isAdmin, updateCourse);

module.exports = router;
