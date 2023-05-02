const express = require("express");
const router = express.Router();
const {
  registerTutor,
  loginTutor,
  getTutor,
} = require("../controllers/tutorController");

router.post("/register", registerTutor);
router.post("/login", loginTutor);
router.get("/search", getTutor);

module.exports = router;
