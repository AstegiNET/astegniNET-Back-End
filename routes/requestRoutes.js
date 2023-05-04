const express = require("express");
const router = express.Router();
const {
  sendRequest,
  updateRequest,
} = require("../controllers/requestController");

const { protect, protectTutee } = require("../middleware/authMiddleware");

router.route("/sendRequest").post(protectTutee, sendRequest);
router.route("/updateRequest/:id").put(protect, updateRequest);
module.exports = router;
