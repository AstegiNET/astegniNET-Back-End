const express = require("express");
const router = express.Router();
const { fetchEnrollments } = require("../controllers/enrollmentController");

const { isLoggedIn } = require("../middleware/authMiddleware");

router.route("/fetchEnrollments").get(isLoggedIn, fetchEnrollments);

module.exports = router;
