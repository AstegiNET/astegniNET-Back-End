const express = require("express");
const router = express.Router();
const {
  registerTutor,
  loginTutor,
  getTutor,
  getTutorbyName,
  getTutorbyRating,
  getTutorbyCourse,
} = require("../controllers/tutorController");

router.post("/register", registerTutor);
router.post("/login", loginTutor);
router.get("/search", getTutor);
router.get("/searchByName", getTutorbyName);
router.get("/searchByRating", getTutorbyRating);
router.get("/searchByCourse", getTutorbyCourse);

module.exports = router;
