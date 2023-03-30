const asyncHandler = require("express-async-handler");

const Course = require("../models/courseModel");
const User = require("../models/tutorModel");

// @desc    Get courses
// @route   GET /api/courses
// @access  Private
const getCourses = asyncHandler(async (req, res) => {
  if (req.user) {
    const courses = await Course.find({ user: req.user.id });

    res.status(200).json(courses);
  } else {
    throw new Error("Please login to view courses");
  }
});

// @desc    Get courses
// @route   GET /api/course
// @access  Private
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  if (!courses) {
    throw new Error("No courses");
  }
  res.status(200).json(courses);
});

// @desc    Set course
// @route   POST /api/courses
// @access  Private
const setCourse = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const course = await Course.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(course);
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the course user
  if (course.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCourse);
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the course user
  if (course.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // await course.remove();

  // Find a user by ID and delete it
  await Course.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCourses,
  getAllCourses,
  setCourse,
  updateCourse,
  deleteCourse,
};
