const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: [true, "Please select tutor to rate"],
    },
    tutee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutee",
      required: [true, "Please login as tutee to rate"],
    },

    rate: { type: Number, required: [true, "Please add a rate"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
