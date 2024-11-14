const mongoose = require("mongoose");

// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "Food Processing",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  payment: {
    type: Boolean,
    default: false, // Payment is false by default
  },
  paymentType: {
    type: String,
    default: null, // Payment type will be null by default
  },
});

// Create and export the model
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
