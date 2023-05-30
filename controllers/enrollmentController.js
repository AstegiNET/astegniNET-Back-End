const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");
const Tutee = require("../models/tuteeModel");
const Tutor = require("../models/tutorModel");
const Enrollment = require("../models/enrollmentModel");
const Course = require("../models/courseModel");

// @desc    add course
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

            status: request.status,
            paymentStatus: request.paymentStatus,
            description: request.description,
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

            status: request.status,
            paymentStatus: request.paymentStatus,
            description: request.description,
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

            status: request.status,
            paymentStatus: request.paymentStatus,
            description: request.description,
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
  fetchEnrollments,
};
