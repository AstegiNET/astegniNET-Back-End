const express = require("express");
const router = express.Router();
const {
  sendRequest,
  getRequests,
  acceptRequest,
  rejectRequest,
  deleteRequest,
  fetchRequests,
  fetchEnrollments,
} = require("../controllers/requestController");

const {
  isTutor,
  isTutee,
  isLoggedIn,
} = require("../middleware/authMiddleware");

router.route("/getRequests").get(isLoggedIn, getRequests);
router.route("/fetchRequests").get(isLoggedIn, fetchRequests);

router.route("/sendRequest").post(isTutee, sendRequest);
router.route("/acceptRequest/:id").put(acceptRequest);
//router.route("/acceptRequest/:id").put(isLoggedIn, acceptRequest);
//router.route("/rejectRequest/:id").put(isTutor, rejectRequest);
router.route("/rejectRequest/:id").put(rejectRequest);
router.route("/deleteRequest/:id").delete(isTutee, deleteRequest);

router.route("/fetchEnrollments").get(isLoggedIn, fetchEnrollments);

module.exports = router;
