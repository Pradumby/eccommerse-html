const express = require("express");
const {
  addCategory,
  getAllCategories,
  getAllProducts,
  addProduct,
  addMultipleProducts,
  getProductById,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);

router.post("/categories", addCategory);
router.get("/categories", getAllCategories);

// POST /api/products - Add a new product
router.post("/product", addProduct);

// POST /api/products/bulk - Add multiple products
router.post("/products", addMultipleProducts);

module.exports = router;
