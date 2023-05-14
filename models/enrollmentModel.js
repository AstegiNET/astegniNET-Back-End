const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema(
  {
    tutee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    status: {
      enum: ["pending", "accepted", "rejected"],
      type: String,
      required: true,
    },

    ispaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    pay_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
