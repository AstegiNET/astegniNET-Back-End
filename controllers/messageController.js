const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Tutor = require("../models/tutorModel");
const Tutee = require("../models/tuteeModel");

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

// @desc    Get message
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ message_id: req.params.id });
    // console.log(messages);
    if (messages) {
      const updatedMessage = await Promise.all(
        messages.map(async (message) => {
          const tutorId = message.message_id.slice(0, 24);
          const tuteeId = message.message_id.slice(24, 48);
          const tutor = await Tutor.findById(tutorId);
          const tutee = await Tutee.findById(tuteeId);
          console.log(tutor.fname);

          return {
            ...message._doc,

            tutor_name: `${tutor.fname} ${tutor.lname}`,
            tutee_name: `${tutee.fname} ${tutee.lname}`,
          };
        })
      );

      res.status(200).json(updatedMessage);
    }
  } catch (Error) {
    res.send(Error);
  }
});

// @desc    add message
const sendMessage = asyncHandler(async (req, res) => {
  const { sender, receiver, message_id, body } = req.body;

  if (!receiver || !body) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const message = await Message.create({
    message_id: message_id,
    sender: req.user.id,
    receiver: receiver,
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
