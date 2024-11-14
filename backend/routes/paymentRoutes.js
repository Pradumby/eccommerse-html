const express = require("express");
const router = express.Router();
const {
  processPayPalPayment,
  processCardPayment,
  processCODPayment,
} = require("../controllers/paymentController");

router.post("/payment/paypal", processPayPalPayment);
router.post("/payment/credit-card", processCardPayment);
router.post("/payment/cod", processCODPayment);

module.exports = router;
