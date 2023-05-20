const express = require("express");
const router = express.Router();
const {
  registerTutee,
  loginTutee,
  updateTutee,
  getTutees,
} = require("../controllers/tuteeController");
const { isTutee, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", registerTutee);

router.post("/login", loginTutee);
router.put("/updateprofile/:id", isTutee, updateTutee);
router.get("/getTutees", isAdmin, getTutees);

module.exports = router;
