const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    tutee: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutee",
      required: [true, "no tutee is added"],
    },
    tutor: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: [true, "no tutor is added"],
    },

    course: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "no course is added"],
    },
    status: {
      required: true,
      type: String,
      enum: ["pending", "payed", "rejected"],
      default: "pending",
    },
    description: {
      type: String,
      default: "payment is performed to enroll a course.",
    },
    tex_ref: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
