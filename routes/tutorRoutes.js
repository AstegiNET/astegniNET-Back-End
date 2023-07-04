const express = require("express");
const router = express.Router();
const {
  registerTutor,
  loginTutor,
  getTutor,
  getTutors,
  getTutorbyName,
  getTutorbyRating,
  getTutorbyCourse,
  rateTutor,
} = require("../controllers/tutorController");
const { isLoggedIn } = require("../middleware/authMiddleware");

router.post("/register", registerTutor);
router.post("/login", loginTutor);
router.get("/tutor/:id", getTutor);
router.get("/search", getTutors);

router.route("/rateTutor/:id").put(isLoggedIn, rateTutor);

router.get("/searchByName", getTutorbyName);
router.get("/searchByRating", getTutorbyRating);
router.get("/searchByCourse", getTutorbyCourse);

module.exports = router;
