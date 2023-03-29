const express = require("express");
const router = express.Router();
const {
  registerTutor,
  loginTutor,
  getMe,
} = require("../controllers/tutorController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerTutor);
router.post("/login", loginTutor);
router.get("/me", protect, getMe);

module.exports = router;
