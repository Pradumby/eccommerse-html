// routes/orderRoutes.js
const express = require("express");
const {
  getOrders,
  addOrder,
  verifyPayment,
  getOrdersByUserId,
} = require("../controllers/orderController");
const router = express.Router();

router.get("/orders/get", getOrders);
router.post("/orders/create", addOrder);
router.post("/orders", getOrdersByUserId);
// for payment verification

router.post("/verifyPayment", verifyPayment);

module.exports = router;
