const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/tutorModel");

// @desc    Get message
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ message_id: req.params.id });
    if (messages) {
    }
    res.status(200).json(messages);
  } catch (Error) {
    res.send(Error);
  }
});

// @desc    Get message
const getAllMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find();
    if (messages) {
    }
    res.status(200).json(messages);
  } catch (Error) {
    res.send(Error);
  }
});
// @desc    add message
const sendMessage = asyncHandler(async (req, res) => {
  const { sender, reciever, body } = req.body;
  if (!reciever || !body) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const message = await Message.create({
    message_id: `${req.user.id}${reciever}`,
    sender: req.user.id,
    reciever: reciever,
    body: body,
  });

  res.status(200).json(message);
});

// @desc    Delete message
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(400);
    throw new Error("Message not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  await Message.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "message deleted" });
});

module.exports = {
  getMessages,
  sendMessage,
  deleteMessage,
  getAllMessages,
};
