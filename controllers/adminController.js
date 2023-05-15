const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const Tutor = require("../models/tutorModel");
const Tutee = require("../models/tuteeModel");

// @desc    Register new admin
// @route   POST /api/admins
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { fname, lname, phone, email, password } = req.body;

  if (!fname || !lname || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.create({
    ...req.body,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      ...admin._doc,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// @desc    Authenticate a admin
// @route   POST /api/admins/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      ...admin._doc,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//verify user
const verifyUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!req.user) {
    res.status(400);
    throw new Error("please login as admin first");
  }

  const tutor = await Tutor.findOne({ _id: userId });
  const tutee = await Tutee.findOne({ _id: userId });

  if (tutor) {
    const verifiedTutor = await Tutor.findByIdAndUpdate(
      userId,
      {
        isQualified: true,
      },
      { new: true }
    );
    res.json(verifiedTutor);
  } else if (tutee) {
    const verifiedTutee = await Tutee.findByIdAndUpdate(
      userId,
      {
        verified: true,
      },
      { new: true }
    );
    res.json(verifiedTutee);
  } else {
    res.json({ user_id: "no user by this id" });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  verifyUser,
};
