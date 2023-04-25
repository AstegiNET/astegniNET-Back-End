const express = require("express");
const router = express.Router();
const {
  registerTutor,
  updateTutee,
  loginTutor,
} = require("../controllers/tutorController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerTutor);
//UPDATE
router.put("/updateprofile/:id", updateTutee);
router.post("/login", loginTutor);

module.exports = router;
