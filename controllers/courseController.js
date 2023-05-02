const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const User = require("../models/tutorModel");

// @desc    Get course
const getCourse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id);
    res.status(200).json(course);
  } catch (Error) {
    res.send(Error);
  }
});

// @desc    add course
const addCourse = asyncHandler(async (req, res) => {
  const { name, level } = req.body;
  if (!name || !level) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const course = await Course.create({
    name: name,
    level: level,
  });

  res.status(200).json(course);
});

// @desc    Update course
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedCourse);
});

// @desc    Delete course
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("Course not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  await Course.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
