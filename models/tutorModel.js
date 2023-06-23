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
    },

    salary: {
      type: Number,
      required: true,
    },
    isQualified: {
      type: Boolean,
      default: false,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please select a course"],
      ref: "Course",
    },
    tutee: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tutee",
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 10,
    },

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

module.exports = mongoose.model("Tutor", userSchema);
