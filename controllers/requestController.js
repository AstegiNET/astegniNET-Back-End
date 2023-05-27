const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");
const Tutee = require("../models/tuteeModel");
const Tutor = require("../models/tutorModel");
const Enrollment = require("../models/enrollmentModel");
const Course = require("../models/courseModel");
// const { request } = require("express");

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
const fetchRequests = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("please login to see your request");
  }

  if (req.user.role === "tutee") {
    const requests = await Request.find({ tutee: req.user._id });
    if (requests) {
      const updatedArray = await Promise.all(
        requests.map(async (request) => {
          const tutor = await Tutor.findById(request.tutor);
          const tutee = await Tutee.findById(request.tutee);
          const course = await Course.findById(request.course);

          return {
            _id: request._id,
            tutor_name: `${tutor.fname} ${tutor.lname}`,
            tutor_avatar: tutor.avatar,
            tutor_id: tutor._id,
            tutor_salary: tutor.salary,

            tutee_name: `${tutee.fname} ${tutee.lname}`,
            tutee_avatar: tutee.avatar,
            tutee_level: tutee.level,
            tutee_id: tutee._id,
            tutee_email: tutee.email,
            tutee_phone: tutee.phone,

            course: course.name,
            course_id: course._id,

            status: request.status,
            paymentStatus: request.paymentStatus,
            description: request.description,
            updatedAt: request.updatedAt,
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
        requests.map(async (request) => {
          const tutor = await Tutor.findById(request.tutor);
          const tutee = await Tutee.findById(request.tutee);
          const course = await Course.findById(request.course);

          return {
            _id: request._id,
            tutor_name: `${tutor.fname} ${tutor.lname}`,
            tutor_avatar: tutor.avatar,
            tutor_id: tutor._id,
            tutor_salary: tutor.salary,

            tutee_name: `${tutee.fname} ${tutee.lname}`,
            tutee_avatar: tutee.avatar,
            tutee_level: tutee.level,
            tutee_id: tutee._id,
            tutee_email: tutee.email,
            tutee_phone: tutee.phone,

            course: course.name,
            course_id: course._id,

            status: request.status,
            paymentStatus: request.paymentStatus,
            description: request.description,
            updatedAt: request.updatedAt,
          };
        })
      );

      res.status(200).json(updatedArray);
    } else {
      res.status(200).json({ message: "you have no requests " });
    }
  }

  if (req.user.role === "admin") {
    const requests = await Request.find();
    if (requests) {
      const updatedArray = await Promise.all(
        requests.map(async (request) => {
          const tutor = await Tutor.findById(request.tutor);
          const tutee = await Tutee.findById(request.tutee);
          const course = await Course.findById(request.course);

          return {
            _id: request._id,
            tutor_name: `${tutor.fname} ${tutor.lname}`,
            tutor_avatar: tutor.avatar,
            tutor_id: tutor._id,
            tutor_salary: tutor.salary,

            tutee_name: `${tutee.fname} ${tutee.lname}`,
            tutee_avatar: tutee.avatar,
            tutee_level: tutee.level,
            tutee_id: tutee._id,
            tutee_email: tutee.email,
            tutee_phone: tutee.phone,

            course: course.name,
            course_id: course._id,

            status: request.status,
            paymentStatus: request.paymentStatus,
            description: request.description,
            updatedAt: request.updatedAt,
          };
        })
      );

      res.status(200).json(updatedArray);
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
// const acceptRequest = asyncHandler(async (req, res) => {
//   const request_id = req.params.id;
//   const request = await Request.findById(request_id);

//   if (!request) {
//     res.status(400);
//     throw new Error("Request not found");
//   }

//   const oldRequest = await Request.findById(request_id);

//   if (oldRequest.status === "pending") {
//     const updatedRequest = await Request.findByIdAndUpdate(
//       request_id,
//       {
//         status: "accepted",
//       },
//       { new: true }
//     );

//     res.status(200).json(updatedRequest);
//   } else {
//     res.status(200).json(`you have ${oldRequest.status} it before`);
//   }
// });

//reject request
const rejectRequest = asyncHandler(async (req, res) => {
  const request_id = req.params.id;
  const request = await Request.findById(request_id);

  if (!request) {
    res.status(400);
    throw new Error("Request not found");
  }

  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("please login first");
  // }

  if (request.status === "pending") {
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
    res.status(200).json(`you have ${request.status} it before`);
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

  if (request.status === "pending") {
    await Request.findByIdAndDelete(request_id);
    res.status(200).json("succesfully deleted request");
  } else {
    res.status(200).json(`nothing to delete`);
  }
});

//reject request
const acceptRequest = asyncHandler(async (req, res) => {
  const request_id = req.params.id;
  const request = await Request.findById(request_id);

  if (!request) {
    res.status(400);
    throw new Error("Request not found");
  }

  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("please login first");
  // }

  if (request.status === "pending") {
    const updatedRequest = await Request.findByIdAndUpdate(
      request_id,
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } else {
    res.status(200).json(`nothing to update`);
  }
});

//
// @desc    fetchEnrollments
const fetchEnrollments = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("please login to see your request");
  }

  if (req.user.role === "tutee") {
    const requests = await Enrollment.find({ tutee: req.user._id });
    if (requests) {
      const updatedArray = await Promise.all(
        requests.map(async (request) => {
          const tutor = await Tutor.findById(request.tutor);
          const tutee = await Tutee.findById(request.tutee);
          const course = await Course.findById(request.course);

          return {
            _id: request._id,
            tutor_name: `${tutor.fname} ${tutor.lname}`,
            tutor_avatar: tutor.avatar,
            tutor_id: tutor._id,
            tutor_salary: tutor.salary,

            tutee_name: `${tutee.fname} ${tutee.lname}`,
            tutee_avatar: tutee.avatar,
            tutee_level: tutee.level,
            tutee_id: tutee._id,
            tutee_email: tutee.email,
            tutee_phone: tutee.phone,

            course: course.name,
            course_id: course._id,

            ispaid: request.ispaid,
            pay_id: request.pay_id,
            updatedAt: request.updatedAt,

            // ...request._doc,
          };
        })
      );

      res.status(200).json(updatedArray);
    } else {
      res.status(200).json({ message: "you have no requests " });
    }
  }

  if (req.user.role === "tutor") {
    const requests = await Enrollment.find({ tutor: req.user._id });
    if (requests) {
      const updatedArray = await Promise.all(
        requests.map(async (request) => {
          const tutor = await Tutor.findById(request.tutor);
          const tutee = await Tutee.findById(request.tutee);
          const course = await Course.findById(request.course);

          return {
            _id: request._id,
            tutor_name: `${tutor.fname} ${tutor.lname}`,
            tutor_avatar: tutor.avatar,
            tutor_id: tutor._id,
            tutor_salary: tutor.salary,

            tutee_name: `${tutee.fname} ${tutee.lname}`,
            tutee_avatar: tutee.avatar,
            tutee_level: tutee.level,
            tutee_id: tutee._id,
            tutee_email: tutee.email,
            tutee_phone: tutee.phone,

            course: course.name,
            course_id: course._id,

            ispaid: request.ispaid,
            pay_id: request.pay_id,
            updatedAt: request.updatedAt,

            // ...request._doc,
          };
        })
      );

      res.status(200).json(updatedArray);
    } else {
      res.status(200).json({ message: "you have no requests " });
    }
  }

  if (req.user.role === "admin") {
    const requests = await Enrollment.find();
    if (requests) {
      const updatedArray = await Promise.all(
        requests.map(async (request) => {
          const tutor = await Tutor.findById(request.tutor);
          const tutee = await Tutee.findById(request.tutee);
          const course = await Course.findById(request.course);

          return {
            _id: request._id,
            tutor_name: `${tutor.fname} ${tutor.lname}`,
            tutor_avatar: tutor.avatar,
            tutor_id: tutor._id,
            tutor_salary: tutor.salary,

            tutee_name: `${tutee.fname} ${tutee.lname}`,
            tutee_avatar: tutee.avatar,
            tutee_level: tutee.level,
            tutee_id: tutee._id,
            tutee_email: tutee.email,
            tutee_phone: tutee.phone,

            course: course.name,
            course_id: course._id,

            ispaid: request.ispaid,
            pay_id: request.pay_id,
            updatedAt: request.updatedAt,

            // ...request._doc,
          };
        })
      );

      res.status(200).json(updatedArray);
    } else {
      res.status(200).json({ message: " no requests " });
    }
  }
});

module.exports = {
  getRequests,
  sendRequest,
  acceptRequest,
  rejectRequest,
  deleteRequest,
  fetchRequests,
  fetchEnrollments,
};
