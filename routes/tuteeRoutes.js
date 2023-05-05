const express = require("express");
const router = express.Router();
const {
  registerTutee,
  loginTutee,
  updateTutee,
} = require("../controllers/tuteeController");
const { isTutee, protectAdmin } = require("../middleware/authMiddleware");

router.post("/register", registerTutee);
router.post("/login", loginTutee);
router.put("/updateprofile/:id", isTutee, updateTutee);

module.exports = router;
