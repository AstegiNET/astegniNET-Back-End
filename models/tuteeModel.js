const mongoose = require("mongoose");
const Enrollment = require("../models/enrollmentModel");

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
      default: "tutee",
    },
    level: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    enrollement: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Enrollment",
    },
    enrolled: [
      {
        tutor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tutor",
        },
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        status: {
          enum: ["pending", "accepted", "rejected"],
          type: String,
        },

        ispaid: {
          type: Boolean,
          default: false,
        },
        pay_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Payment",
        },
      },
    ],
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tutee", userSchema);
