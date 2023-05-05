const router = require("express").Router();
const {
  InitializePayent,
  verify,
  success,
} = require("../controllers/paymentController");
const { isTutee } = require("../middleware/authMiddleware");

router.post("/pay", isTutee, InitializePayent);
router.get("/pay/verify/:id", isTutee, verify);
router.get("/pay/success", isTutee, success);

module.exports = router;
