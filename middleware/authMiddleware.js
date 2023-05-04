const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Tutor = require("../models/tutorModel");
const Tutee = require("../models/tuteeModel");
const Admin = require("../models/adminModel");

//tutor middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Tutor.findById(decoded.id).select("-password");

      const tutor = await Tutor.findById(decoded.id).select("-password");
      const admin = await Admin.findById(decoded.id).select("-password");
      if (tutor) {
        req.user = tutor;
      } else if (admin) {
        req.user = admin;
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//tutee middleware
const protectTutee = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const tutee = await Tutee.findById(decoded.id).select("-password");
      const tutor = await Tutor.findById(decoded.id).select("-password");
      const admin = await Admin.findById(decoded.id).select("-password");
      if (tutee) {
        req.user = tutee;
      } else if (admin) {
        req.user = admin;
      } else if (tutor) {
        req.user = tutor;
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//admin middleware
const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Admin.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect, protectTutee, protectAdmin };
