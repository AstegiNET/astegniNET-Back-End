const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: [true, "no tutor is added"],
    },
    tutee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutee",
      required: [true, "no tutee is added"],
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "no course is added"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    description: {
      type: String,
      default: "I want to enroll your course .",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);
