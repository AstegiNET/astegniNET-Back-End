const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");

// @desc    add course
const sendRequest = asyncHandler(async (req, res) => {
  // const { tutor, tutee, course, description } = req.body;

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
  sendRequest,

  updateRequest,
};
