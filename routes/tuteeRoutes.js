const express = require("express");
const router = express.Router();
const {
  registerTutee,
  loginTutee,
  getMe,
} = require("../controllers/tuteeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerTutee);
router.post("/login", loginTutee);
router.get("/me", protect, getMe);

module.exports = router;
