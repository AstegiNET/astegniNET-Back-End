const express = require("express");
const router = express.Router();
const { sendRequest } = require("../controllers/requestController");

router.post("/sendRequest", sendRequest);

module.exports = router;
