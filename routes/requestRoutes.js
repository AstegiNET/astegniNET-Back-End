const express = require("express");
const router = express.Router();
const {
  sendRequest,
  getRequests,
  acceptRequest,
  rejectRequest,
  deleteRequest,
  getRequestsEach,
} = require("../controllers/requestController");

const {
  isTutor,
  isTutee,
  isLoggedIn,
} = require("../middleware/authMiddleware");

router.route("/getRequests").get(isLoggedIn, getRequests);
router.route("/getRequestsEach").get(isLoggedIn, getRequestsEach);

router.route("/sendRequest").post(isTutee, sendRequest);
router.route("/acceptRequest/:id").put(isTutor, acceptRequest);
router.route("/rejectRequest/:id").put(isTutor, rejectRequest);
router.route("/deleteRequest/:id").delete(isTutee, deleteRequest);

module.exports = router;
