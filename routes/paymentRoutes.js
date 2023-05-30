const router = require("express").Router();
const {
  InitializePayment,
  verify,
  success,
  addPayment,
  getPayment,
} = require("../controllers/paymentController");
const { isTutee } = require("../middleware/authMiddleware");

router.post("/pay", isTutee, InitializePayment);
router.get("/pay/verify/:id", isTutee, verify);
router.get("/pay/success", isTutee, success);
router.route("/addPay/:id").post(isTutee, addPayment);
router.route("/getPayment/:id").get(isTutee, getPayment);
module.exports = router;
