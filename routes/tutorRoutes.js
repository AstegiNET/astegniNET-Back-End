const express = require("express");
const router = express.Router();
const { registerTutor, loginTutor } = require("../controllers/tutorController");

router.post("/register", registerTutor);
router.post("/login", loginTutor);

module.exports = router;
