const express = require("express");
const router = express.Router();
const { sendRequest } = require("../controllers/courseControllercopy");

const { protect } = require("../middleware/authMiddleware");

router.route("/addCourse").post(protect, sendRequest);

module.exports = router;
