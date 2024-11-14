// routes/authRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  getUserDetailsById,
  updateUserDetailsById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/user/details", getUserDetailsById);
router.put("/update/user/details", updateUserDetailsById);

module.exports = router;
