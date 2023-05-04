const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
    },
    tutee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutee",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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
