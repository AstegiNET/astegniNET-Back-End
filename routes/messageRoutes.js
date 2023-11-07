const express = require("express");
const router = express.Router();
const {
  sendMessage,

  deleteMessage,
  getMessages,
  getAllMessages,
} = require("../controllers/messageController");

const { isAdmin, isLoggedIn } = require("../middleware/authMiddleware");

router.route("/sendMessage").post(isLoggedIn, sendMessage);
router.route("/getAllMessages").get(isLoggedIn, getAllMessages);
router.route("/getMessages/:id").get(isLoggedIn, getMessages);
router.route("/deleteMessage/:id").delete(isLoggedIn, deleteMessage);

module.exports = router;
