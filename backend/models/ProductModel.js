const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  oldPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Reference to Category model
});

module.exports = mongoose.model("Product", productSchema);
