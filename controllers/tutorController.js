const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Tutor = require("../models/tutorModel");

// @desc    Register new tutor
// @route   POST /api/tutors
// @access  Public
const registerTutor = asyncHandler(async (req, res) => {
  const {
    fname,
    lname,
    phone,
    email,
    role,
    salary,
    isQualified,
    course,
    tutee,
    rating,
    password,
  } = req.body;

  if (!fname || !lname || !phone || !email || !password || !salary) {
    //  || !course
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
    fname,
    lname,
    phone,
    email,
    role,
    salary,
    isQualified,
    course,
    tutee,
    rating,
    password: hashedPassword,
  });

  if (tutor) {
    res.status(201).json({
      _id: tutor.id,
      fname: tutor.fname,
      lname: tutor.lname,
      email: tutor.email,
      phone: tutor.phone,
      role: tutor.role,
      salary: tutor.salary,
      course: tutor.course,
      rating: tutor.rating,
      isQualified: tutor.isQualified,
      tutee: tutor.tutee,
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
  // Check for tutor email
  const tutor = await Tutor.findOne({ email });
  if (tutor && (await bcrypt.compare(password, tutor.password))) {
    res.json({
      _id: tutor.id,
      fname: tutor.fname,
      lname: tutor.lname,
      email: tutor.email,
      phone: tutor.phone,
      role: tutor.role,
      salary: tutor.salary,
      course: tutor.course,
      rating: tutor.rating,
      isQualified: tutor.isQualified,
      tutee: tutor.tutee,
      token: generateToken(tutor._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
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
};
