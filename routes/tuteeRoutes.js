const express = require("express");
const router = express.Router();
const { registerTutee, loginTutee } = require("../controllers/tuteeController");

router.post("/register", registerTutee);
router.post("/login", loginTutee);

module.exports = router;
