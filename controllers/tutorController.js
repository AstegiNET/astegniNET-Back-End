const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Tutor = require("../models/tutorModel");
const Course = require("../models/courseModel");

// @desc    Register new tutor
// @route   POST /api/tutors
// @access  Public
const registerTutor = asyncHandler(async (req, res) => {
  const { fname, lname, phone, email, salary, course, rating, password } =
    req.body;

  if (!fname || !lname || !phone || !email || !password || !salary || !course) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if tutor exists
  const tutorExists = await Tutor.findOne({ email });

  if (tutorExists) {
    res.status(400);
    throw new Error("Tutor already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create tutor
  const tutor = await Tutor.create({
    ...req.body,
    password: hashedPassword,
  });

  if (tutor) {
    res.status(201).json({
      ...tutor._doc,
      token: generateToken(tutor._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid tutor data");
  }
});

// @desc    Authenticate a tutor
// @route   POST /api/tutors/login
// @access  Public
const loginTutor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const tutor = await Tutor.findOne({ email });
  if (tutor && (await bcrypt.compare(password, tutor.password))) {
    res.json({
      ...tutor._doc,
      token: generateToken(tutor._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//get tutors
const getTutor = asyncHandler(async (req, res) => {
  const { fname, rating, course } = req.query;
  let allTutors = [];
  try {
    const regex = new RegExp(course, "i");
    const results = await Course.find({ name: { $regex: regex } });

    if (results.length && fname && rating) {
      for (let i = 0; i < results.length; i++) {
        const tutor = await Tutor.findOne({
          fname: fname,
          course: results[i]._id,
          rating: rating,
        });

        allTutors.push(tutor);
      }
    }
    console.log(allTutors.length);
    res.status(200).send(allTutors);
  } catch (err) {
    next(err);
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerTutor,
  loginTutor,
  getTutor,
};
