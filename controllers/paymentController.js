const axios = require("axios");
const Chapa = require("chapa");
const { v4: uuidv4 } = require("uuid");

const chapa = new Chapa({
  secretKey: "CHASECK_TEST-w7QtAK8w0CUQBzCtbV1rz1eQj2xt7eOL",
});

const secretKey = "CHASECK_TEST-w7QtAK8w0CUQBzCtbV1rz1eQj2xt7eOL";
const base_url = "https://api.chapa.co/v1/transaction/initialize";

//initialize payment
const InitializePayent = async (req, res) => {
  const data = req.body;

  await axios
    .post(base_url, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
    })
    .then((response) => {
      console.log(response.data.data.checkout_url);
      res.send(JSON.stringify(response.data.data.checkout_url));
    })
    .catch((err) => console.log(err));
};

module.exports = { InitializePayent };
