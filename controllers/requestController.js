const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");

// @desc    add course
const getRequests = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("please login to see your request");
  }

  if (req.user.role === "tutee") {
    const requests = await Request.find({ tutee: req.user._id });
    if (requests) {
      res.status(200).json(requests);
    } else {
      res.status(200).json({ message: "you have no requests " });
    }
  }

  if (req.user.role === "tutor") {
    const requests = await Request.find({ tutor: req.user._id });
    if (requests) {
      res.status(200).json(requests);
    } else {
      res.status(200).json({ message: "you have no requests " });
    }
  }

  if (req.user.role === "admin") {
    const requests = await Request.find();
    if (requests) {
      res.status(200).json(requests);
    } else {
      res.status(200).json({ message: " no requests " });
    }
  }
});

// @desc    add course
const sendRequest = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("please login to send your request");
  }

  const request = await Request.create({
    tutee: req.user._id,
    ...req.body,
  });
  res.status(200).json(request);
});

//updateRequest << accept or reject>> request
// PUT request
const updateRequest = asyncHandler(async (req, res) => {
  const course_id = req.params.id;
  const request = await Request.findById(req.params.id);

  if (!request) {
    res.status(400);
    throw new Error("Request not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("please login first");
  }

  console.log(req.user._id.equals(request.tutor));
  if (!req.user._id.equals(request.tutor)) {
    res.status(401);
    throw new Error("you can't update this request");
  }

  const updatedRequest = await Request.findByIdAndUpdate(
    course_id,
    {
      tutor: req.user._id,
      ...req.body,
    },
    { new: true }
  );
  res.status(200).json(updatedRequest);
});

module.exports = {
  getRequests,
  sendRequest,
  updateRequest,
};
