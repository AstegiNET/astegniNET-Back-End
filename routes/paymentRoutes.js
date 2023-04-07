const router = require("express").Router();
const {
  InitializePayent,
  verify,
  success,
} = require("../controllers/paymentController");
const { protectTutee } = require("../middleware/authMiddleware");

router.post("/pay", protectTutee, InitializePayent);
router.get("/pay/verify/:id", protectTutee, verify);
router.get("/pay/success", protectTutee, success);

module.exports = router;
