const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lname: {
      type: String,
      required: [true, "Please add a last name"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    role: {
      type: String,
      default: "tutor",
      required: [true, "Please select a role"],
    },
    salary: {
      type: Number,
      required: [true, "please add salary"],
    },
    isQualified: {
      type: Boolean,
      default: false,
      required: true,
    },
    course: {
      type: [mongoose.Schema.Types.ObjectId],
      required: [true, "Please select a course"],
    },
    tutee: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tutee",
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tutor", userSchema);
