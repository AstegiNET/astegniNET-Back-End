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
      default: "tutee",
    },
    verified: {
      type: Boolean,
      default: false,
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
      },
    ],
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tutee", userSchema);
