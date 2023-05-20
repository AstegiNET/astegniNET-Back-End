const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");
const Tutee = require("../models/tuteeModel");
const Tutor = require("../models/tutorModel");
const Enrollment = require("../models/enrollmentModel");
const Course = require("../models/courseModel");

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
      console.log(requests);
      res.status(200).json(requests);
    } else {
      res.status(200).json({ message: " no requests " });
    }
  }
});

// @desc    add course
const getRequestsEach = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("please login to see your request");
  }

  if (req.user.role === "tutee") {
    const requests = await Request.find({ tutee: req.user._id });
    if (requests) {
      const updatedArray = await Promise.all(
        requests.map(async (obj) => {
          const tutor = await Tutor.findById(obj.tutor);
          const tutee = await Tutee.findById(obj.tutee);
          const course = await Course.findById(obj.course);

          return {
            tutor: tutor.fname,
            tutee: tutee.fname,
            course: course.name,
            status: obj.status,
            description: obj.description,
          };
        })
      );

      res.status(200).json(updatedArray);
    } else {
      res.status(200).json({ message: "you have no requests " });
    }
  }

  if (req.user.role === "tutor") {
    const requests = await Request.find({ tutor: req.user._id });
    if (requests) {
      const updatedArray = await Promise.all(
        requests.map(async (obj) => {
          const tutor = await Tutor.findById(obj.tutor); // Assuming Tutor.findById() returns a promise
          obj.tutor = tutor;
          return obj;
        })
      );
      console.log(updatedArray);

      res.status(200).json(requests);
    } else {
      res.status(200).json({ message: "you have no requests " });
    }
  }

  if (req.user.role === "admin") {
    const requests = await Request.find();
    if (requests) {
      const updatedArray = await Promise.all(
        requests.map(async (obj) => {
          const tutor = await Tutor.findById(obj.tutor); // Assuming Tutor.findById() returns a promise
          obj.tutor = tutor;
          return obj;
        })
      );
      console.log(updatedArray);

      res.status(200).json(requests);
    } else {
      res.status(200).json({ message: " no requests " });
    }
  }
});

// @desc    add course
const sendRequest = asyncHandler(async (req, res) => {
  const { course, tutor } = req.body;
  const tutee = req.user._id;

  if (!req.user) {
    res.status(401);
    throw new Error("please login to send your request");
  }
  const oldRequest = await Request.find({
    tutor: tutor,
    course: course,
    tutee: tutee,
  });

  if (!oldRequest.length) {
    const request = await Request.create({
      tutee: req.user._id,
      ...req.body,
    });
    res.status(200).json(request);
  } else {
    res.status(200).json("you have already sent");
  }
});

//accept request
const acceptRequest = asyncHandler(async (req, res) => {
  const request_id = req.params.id;
  const request = await Request.findById(req.params.id);

  if (!request) {
    res.status(400);
    throw new Error("Request not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("please login first");
  }

  if (!req.user._id.equals(request.tutor)) {
    res.status(401);
    throw new Error("you can't update this request");
  }

  const oldRequest = await Request.findById(request_id);

  if (oldRequest.status === "pending") {
    const updatedRequest = await Request.findByIdAndUpdate(
      request_id,
      {
        status: "accepted",
      },
      { new: true }
    );

    res.status(200).json(updatedRequest);
  } else {
    res.status(200).json(`you have ${oldRequest.status} it before`);
  }
});

//reject request
const rejectRequest = asyncHandler(async (req, res) => {
  const request_id = req.params.id;
  const request = await Request.findById(req.params.id);

  if (!request) {
    res.status(400);
    throw new Error("Request not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("please login first");
  }

  if (!req.user._id.equals(request.tutor)) {
    res.status(401);
    throw new Error("you can't update this request");
  }

  const oldRequest = await Request.findById(request_id);
  if (oldRequest.status === "pending") {
    const updatedRequest = await Request.findByIdAndUpdate(
      request_id,
      {
        status: "rejected",
      },
      { new: true }
    );

    if (updatedRequest) {
      res.status(200).json(updatedRequest);
    }
  } else {
    res.status(200).json(`you have ${oldRequest.status} it before`);
  }
});

//reject request
const deleteRequest = asyncHandler(async (req, res) => {
  const request_id = req.params.id;
  const request = await Request.findById(request_id);

  if (!request) {
    res.status(400);
    throw new Error("Request not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("please login first");
  }

  if (request.status === "pending" && request.tutee === req.user._id) {
    await Request.findByIdAndDelete(request_id);
    res.status(200).json("succesfully deleted request");
  } else {
    res.status(200).json(`nothing to delete`);
  }
});

module.exports = {
  getRequests,
  sendRequest,
  acceptRequest,
  rejectRequest,
  deleteRequest,
  getRequestsEach,
};
