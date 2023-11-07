const express = require("express");
const router = express.Router();
const { rateTutor, getAllRates } = require("../controllers/rateController");

const { isTutee, isTutor } = require("../middleware/authMiddleware");

router.route("/ratingTutor/:id").post(isTutee, rateTutor);
router.route("/getAllrates/:id").get(getAllRates);

module.exports = router;
