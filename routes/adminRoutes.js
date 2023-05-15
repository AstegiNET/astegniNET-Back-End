const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  verifyUser,
} = require("../controllers/adminController");
const { isAdmin } = require("../middleware/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.route("/verifyUser/:id").put(isAdmin, verifyUser);

module.exports = router;
