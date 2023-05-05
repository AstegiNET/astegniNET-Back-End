const express = require("express");
const router = express.Router();
const {
  sendRequest,
  updateRequest,
  getRequests,
} = require("../controllers/requestController");

const {
  isAdminTutor,
  isTutee,
  isLoggedIn,
} = require("../middleware/authMiddleware");

router.route("/getRequests").get(isLoggedIn, getRequests);
router.route("/sendRequest").post(isTutee, sendRequest);
router.route("/updateRequest/:id").put(isAdminTutor, updateRequest);
module.exports = router;
