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

    enrolledTutor: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tutor",
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
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcreazilla.com%2Fnodes%2F3251108-person-icon&psig=AOvVaw13KGGbrS6vfbBuAxhl5urC&ust=1687601738037000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLDGpNKU2f8CFQAAAAAdAAAAABAI",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tutee", userSchema);
