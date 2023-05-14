const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Tutee = require("../models/tuteeModel");
const Enrollment = require("../models/enrollmentModel");
const Tutor = require("../models/tutorModel");

const axios = require("axios");
const Chapa = require("chapa");

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY,
});

const secretKey = process.env.CHAPA_SECRET_KEY;
const base_url = "https://api.chapa.co/v1/transaction/initialize";
const verify_url = "https://api.chapa.co/v1/transaction/verify/";

//config

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${secretKey}`,
  },
};

//initialize payment
const InitializePayment = async (req, res) => {
  const inputData = req.body;

  await axios
    .post(base_url, inputData, config)
    .then((response) => {
      console.log(response.data.data);
      res.status(201).json({ ...response.data.data, ...inputData });
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
};

// verification endpoint
const verify = async (req, res) => {
  //verify the transaction
  await axios
    .get(verify_url + req.params.id, config)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch((err) => console.log("Payment can't be verfied", err));
};

// @desc    add course
const addPayment = asyncHandler(async (req, res) => {
  const { course, tutor, tex_ref } = req.body;

  if (!req.user) {
    res.status(401);
    throw new Error("please login to pay your payment");
  }
  const tutee = req.user;
  const oldPayment = await Payment.find({
    tutor: tutor,
    course: course,
    tutee: tutee,
    tex_ref: tex_ref,
    status: "payed",
  });

  if (!oldPayment.length) {
    const payment = await Payment.create({
      tutee: req.user._id,
      ...req.body,
    });

    if (payment) {
      const enrollment = await Enrollment.create({
        tutee: payment.tutee,
        tutor: payment.tutor,
        course: payment.course,
        status: "accepted",
        ispaid: true,
        pay_id: payment._id,
      });
      if (enrollment) {
        const updatedTutee = await Tutee.findByIdAndUpdate(
          enrollment.tutee,
          {
            enrollement: enrollment._id,
          },
          { new: true }
        );

        const updateTutor = Tutor.findByIdAndUpdate(
          enrollment.tutor,
          {
            $push: { tutee: enrollment.tutee },
            isQualified: true,
          },
          { new: true }
        );
      }
    }

    res.status(200).json(payment);
  } else {
    res.status(200).json("you have already payed");
  }
});

// success callback
const success = async (req, res) => {
  res.render("success");
};

module.exports = { InitializePayment, verify, success, addPayment };
