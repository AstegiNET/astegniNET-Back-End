const asyncHandler = require("express-async-handler");
const Rating = require("../models/ratingModel");
const Tutor = require("../models/tutorModel");

const rateTutor = asyncHandler(async (req, res) => {
  const { rate } = req.body;
  const tutee = req.user;
  const tutor_id = req.params.id;

  if (!rate) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  if (!tutee) {
    res.status(401);
    throw new Error("please login as tutee");
  }
  const tutor = await Tutor.findById({ _id: tutor_id });
  if (tutor) {
    const tuteeExists = tutor.enrolledTutee.includes(tutee.id);
    const tuteeRated = tutor.ratedTutee.includes(tutee.id);
    console.log(tutor.ratedTutee);
    console.log(tutee.id);

    if (tuteeExists && !tuteeRated) {
      const createdRate = await Rating.create({
        tutee: req.user.id,
        tutor: req.params.id,
        rate: rate,
      });

      if (createdRate) {
        const updatedTutor = await Tutor.findByIdAndUpdate(
          tutor_id,
          { $push: { ratedTutee: createdRate.tutee } },
          { new: true }
        );
      }

      res.status(200).json(createdRate);
    } else {
      res
        .status(200)
        .json({ message: "you are not allowed to rate this tutor" });
    }
  } else {
    res.status(200).json({ message: "there is not valid tutor" });
  }
});

// @desc    Get message
const getAllRates = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "please  login as tutor" });
  }
  try {
    const rates = await Rating.find({ tutor: req.params.id });
    if (rates) {
    }
    res.status(200).json(rates);
  } catch (Error) {
    res.send(Error);
  }
});

module.exports = {
  rateTutor,
  getAllRates,
};
