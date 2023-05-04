const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");

// @desc    add course
const sendRequest = asyncHandler(async (req, res) => {
  const { tutor, tutee, course, description } = req.body;
  if (!tutor || !tutee || course) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const request = await Request.create(req.body);

  res.status(200).json({ Request: "hallo" });
});

// @

module.exports = {
  sendRequest,
};
