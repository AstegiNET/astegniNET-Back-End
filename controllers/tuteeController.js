const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Tutee = require("../models/tuteeModel");

// @desc    Register new tutee
// @route   POST /api/tutees
// @access  Public
const registerTutee = asyncHandler(async (req, res) => {
  const { fname, lname, phone, email, role, password } = req.body;

  if (!fname || !lname || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const tuteeExists = await Tutee.findOne({ email });

  if (tuteeExists) {
    res.status(400);
    throw new Error("Tutee already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tutee = await Tutee.create({
    ...req.body,
    password: hashedPassword,
  });

  if (tutee) {
    res.status(201).json({
      ...tutee._doc,
      token: generateToken(tutee._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid tutee data");
  }
});

// @desc    Authenticate a tutee
// @route   POST /api/tutees/login
// @access  Public
const loginTutee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const tutee = await Tutee.findOne({ email });
  if (tutee && (await bcrypt.compare(password, tutee.password))) {
    res.json({
      ...tutee._doc,
      token: generateToken(tutee._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getTutees = asyncHandler(async (req, res) => {
  const tutees = await Tutee.find();
  if (tutees) {
    res.status(200).json(tutees);
  } else {
    res.status(200).json("no tutees found");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//update tutee
//@desc PUT /api/tutees/update/:id
const updateTutee = async (req, res, next) => {
  const tutee_id = req.params.id;
  try {
    const tutee = await Tutee.findById(req.params.id);

    if (tutee) {
      if (req.user) {
        if (
          req.user._id.equals(tutee._id) ||
          req.user.role === ("admin" || "tutor")
        ) {
          try {
            var hash;
            if (req.body.password) {
              const salt = bcrypt.genSaltSync(10);
              hash = bcrypt.hashSync(req.body.password, salt);
            } else {
              hash = await Tutee.findById(req.params.id).password;
            }

            const updatedTutee = await Tutee.findByIdAndUpdate(
              tutee_id,
              { ...req.body, password: hash },
              { new: true }
            );
            res.status(200).json(updatedTutee);
          } catch (err) {
            next(err);
          }
        } else {
          res.status(401);
          res.send("not the right user to update");
        }
      } else {
        res.status(401);
        res.send("please login first");
      }
    }
  } catch (error) {
    res.status(400);
    res.send("Tutee not found");
  }
};

module.exports = {
  registerTutee,
  updateTutee,
  loginTutee,
  getTutees,
};
