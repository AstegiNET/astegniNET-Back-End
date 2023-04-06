const router = require("express").Router();
const { InitializePayent } = require("../controllers/paymentController");

router.post("/pay", InitializePayent);

module.exports = router;
