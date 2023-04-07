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
const InitializePayent = async (req, res) => {
  const inputData = req.body;

  await axios
    .post(base_url, inputData, config)
    .then((response) => {
      console.log(response.data.data);
      res.send(JSON.stringify(response.data.data));
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
      console.log(response.data);
    })
    .catch((err) => console.log("Payment can't be verfied", err));
};

// success callback
const success = async (req, res) => {
  res.render("success");
};

module.exports = { InitializePayent, verify, success };
