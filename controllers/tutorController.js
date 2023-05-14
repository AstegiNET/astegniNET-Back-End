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
  if (!fname || !lname || !phone || !email || !password || !salary) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const tutorExists = await Tutor.findOne({ email });

  if (tutorExists) {
    res.status(400);
    throw new Error("Tutor already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

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

//get tutor
const getTutor = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const tutor = await Tutor.findById(id).select("-password");
    res.status(200).send(tutor);
  } catch (err) {
    next(err);
  }
});

//get tutors
const getTutors = asyncHandler(async (req, res) => {
  const { fname, rating, course } = req.query;
  const query = {};
  if (fname) query.fname = fname;
  if (rating) query.rating = rating;

  try {
    const regex_course = new RegExp(course, "i");
    const courses = await Course.find({ name: { $regex: regex_course } });
    const tutors = await Promise.all(
      courses.map((course) => {
        if (course) query.course = course._id;
        return Tutor.find(query);
      })
    );

    let allTutors = tutors.filter((tutor) => tutor.length !== 0).flat();

    // const regex_name = new RegExp(fname, "i");
    // const my_tutor = await Tutor.find({ fname: { $regex: regex_name } });
    // const my_tutors = await Promise.all(
    //   my_tutor.map((tutor) => {
    //     if (tutor) query.tutor = tutor._id;
    //     return Tutor.find(query);
    //   })
    // );

    let new_tutors = [];
    for (let i = 0; i < allTutors.length; i++) {
      const courseName = await Course.findOne({ _id: allTutors[i].course });

      new_tutors.push({
        id: allTutors[i].id,
        fname: allTutors[i].fname,
        lname: allTutors[i].lname,
        rating: allTutors[i].rating,
        avatar: allTutors[i].avatar,
        salary: allTutors[i].salary,
        courseName: courseName.name,
        courseLevel: courseName.level,
      });
    }

    res.status(200).send(new_tutors);
  } catch (err) {
    next(err);
  }
});

//get tutors
const getTutorbyName = asyncHandler(async (req, res) => {
  const { fname } = req.query;

  try {
    const regex = new RegExp(fname, "i");
    const allTutors = await Tutor.find({ fname: { $regex: regex } });

    let new_tutors = [];
    for (let i = 0; i < allTutors.length; i++) {
      const courseName = await Course.findOne({ _id: allTutors[i].course });

      new_tutors.push({
        id: allTutors[i].id,
        fname: allTutors[i].fname,
        lname: allTutors[i].lname,
        rating: allTutors[i].rating,
        avatar: allTutors[i].avatar,
        salary: allTutors[i].salary,
        courseName: courseName.name,
        courseLevel: courseName.level,
      });
    }

    res.status(200).send(new_tutors);
  } catch (err) {
    next(err);
  }
});

const getTutorbyRating = asyncHandler(async (req, res) => {
  const { rating } = req.query;

  try {
    const tutors = await Tutor.find();
    const allTutors = tutors.filter((tutor) => tutor.rating >= rating);

    let new_tutors = [];
    for (let i = 0; i < allTutors.length; i++) {
      const courseName = await Course.findOne({ _id: allTutors[i].course });

      new_tutors.push({
        id: allTutors[i].id,
        fname: allTutors[i].fname,
        lname: allTutors[i].lname,
        rating: allTutors[i].rating,
        avatar: allTutors[i].avatar,
        salary: allTutors[i].salary,
        courseName: courseName.name,
        courseLevel: courseName.level,
      });
    }

    res.status(200).send(new_tutors);
  } catch (err) {
    next(err);
  }
});

const getTutorbyCourse = asyncHandler(async (req, res) => {
  const { course } = req.query;

  try {
    const regex = new RegExp(course, "i");
    const courses = await Course.find({ name: { $regex: regex } });

    const tutors = await Promise.all(
      courses.map((course) => {
        return Tutor.find({ course: course._id });
      })
    );
    let allTutors = tutors.filter((tutor) => tutor.length !== 0).flat();

    let new_tutors = [];
    for (let i = 0; i < allTutors.length; i++) {
      const courseName = await Course.findOne({ _id: allTutors[i].course });

      new_tutors.push({
        id: allTutors[i].id,
        fname: allTutors[i].fname,
        lname: allTutors[i].lname,
        rating: allTutors[i].rating,
        avatar: allTutors[i].avatar,
        salary: allTutors[i].salary,
        courseName: courseName.name,
        courseLevel: courseName.level,
      });
    }

    res.status(200).send(new_tutors);
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
  getTutors,
  getTutorbyRating,
  getTutorbyName,
  getTutorbyCourse,
};
