const router = require("express").Router();
const { InitializePayent } = require("../controllers/paymentController");
const { protectTutee } = require("../middleware/authMiddleware");

router.post("/pay", protectTutee, InitializePayent);

module.exports = router;
