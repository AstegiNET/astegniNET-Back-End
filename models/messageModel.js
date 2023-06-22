const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor" || "Tutee" || "Admin",
      required: [true, "Please add a sender"],
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor" || "Tutee" || "Admin",
      required: [true, "Please add a reciever"],
    },
    body: { type: String, required: [true, "Please add a text value"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
