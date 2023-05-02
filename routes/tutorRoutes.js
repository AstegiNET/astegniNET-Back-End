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
} = require("../controllers/tutorController");

router.post("/register", registerTutor);
router.post("/login", loginTutor);
router.get("/tutor/:id", getTutor);
router.get("/search", getTutors);
router.get("/searchByName", getTutorbyName);
router.get("/searchByRating", getTutorbyRating);
router.get("/searchByCourse", getTutorbyCourse);

module.exports = router;
