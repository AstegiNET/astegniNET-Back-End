const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Tutee = require("../models/tuteeModel");
const Enrollment = require("../models/enrollmentModel");
const Tutor = require("../models/tutorModel");
const Request = require("../models/requestModel");

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
      console.log({ ...response.data.data, ...inputData });
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
  const tutee = req.user;
  const request_id = req.params.id;

  if (!req.user) {
    res.status(401);
    throw new Error("please login to pay your payment");
  }

  const request = Request.findById(request_id);

  if (request && request.paymentStatus != "payed") {
    const payment = await Payment.create({
      tutee: req.user._id,
      ...req.body,
    });
    if (payment) {
      const enrollment = await Enrollment.create({
        request: request_id,
        tutee: payment.tutee,
        tutor: payment.tutor,
        course: payment.course,
        status: "accepted",
        ispaid: true,
        pay_id: payment._id,
      });

      if (enrollment) {
        Request.findByIdAndDelete(request_id);

        await Tutee.findByIdAndUpdate(
          enrollment.tutee,
          {
            $push: {
              enrollement: enrollment._id,
              enrolledTutor: enrollment.tutor,
            },
          },
          { new: true }
        );

        await Tutor.findByIdAndUpdate(
          enrollment.tutor,
          {
            $push: { tutee: enrollment._id, enrolledTutee: enrollment.tutee },
          },
          { new: true }
        );
        await Request.findByIdAndUpdate(
          request_id,
          { paymentStatus: "payed" },
          { new: true }
        );
      }
    }

    res.status(200).json(payment);
  }
});

// @desc    add course
const getPayment = asyncHandler(async (req, res) => {
  const tex_ref_id = req.params.id;
  if (!req.user) {
    res.status(401);
    throw new Error("please login to pay your payment");
  }

  const paymentInfo = await Payment.findOne({ tex_ref: tex_ref_id });
  console.log(paymentInfo);
  if (paymentInfo) {
    res.status(200).json(paymentInfo);
  } else {
    res.status(200).json(`no payment by tex_ref=${tex_ref_id}`);
  }
});

// success callback
const success = async (req, res) => {
  res.render("success");
};

module.exports = { InitializePayment, verify, success, addPayment, getPayment };
