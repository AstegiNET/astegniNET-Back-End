const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Tutee = require("../models/tuteeModel");

// @desc    Register new tutee
// @route   POST /api/tutees
// @access  Public
const registerTutee = asyncHandler(async (req, res) => {
  const { fname, lname, phone, email, role, password, enrolled } = req.body;

  if (!fname || !lname || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if tutee exists
  const tuteeExists = await Tutee.findOne({ email });

  if (tuteeExists) {
    res.status(400);
    throw new Error("Tutee already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create tutee
  const tutee = await Tutee.create({
    fname,
    lname,
    phone,
    email,
    role,
    password: hashedPassword,
  });

  if (tutee) {
    res.status(201).json({
      _id: tutee.id,
      fname: tutee.fname,
      lname: tutee.lname,
      email: tutee.email,
      phone: tutee.phone,
      role: tutee.role,
      tutor: tutee.tutor,
      token: generateToken(tutee._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid tutee data");
  }
});

//update tutee
//@desc PUT /api/tutees/update/:id

const updateTutee = async (req, res, next) => {
  try {
    var hash;
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(req.body.password, salt);
    } else {
      hash = await Tutee.findById(req.params.id).password;
    }

    const updatedTutee = await Tutee.findByIdAndUpdate(
      req.params.id,
      { ...req.body, password: hash },
      { new: true }
    );
    res.status(200).json(updatedTutee);
  } catch (err) {
    next(err);
  }

  console.log("update user");
};

// @desc    Authenticate a tutee
// @route   POST /api/tutees/login
// @access  Public
const loginTutee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check for tutee email
  const tutee = await Tutee.findOne({ email });
  if (tutee && (await bcrypt.compare(password, tutee.password))) {
    res.json({
      _id: tutee.id,
      fname: tutee.fname,
      lname: tutee.lname,
      email: tutee.email,
      phone: tutee.phone,
      role: tutee.role,
      tutor: tutee.tutor,
      token: generateToken(tutee._id),
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
  registerTutee,
  updateTutee,
  loginTutee,
};
