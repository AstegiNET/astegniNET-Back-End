const axios = require("axios");
const Chapa = require("chapa");

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY,
});

const secretKey = process.env.CHAPA_SECRET_KEY;
const base_url = "https://api.chapa.co/v1/transaction/initialize";

//initialize payment
const InitializePayent = async (req, res) => {
  const inputData = req.body;

  await axios
    .post(base_url, inputData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
    })
    .then((response) => {
      console.log(response.data.data);
      res.send(JSON.stringify(response.data.data));
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
};

module.exports = { InitializePayent };
