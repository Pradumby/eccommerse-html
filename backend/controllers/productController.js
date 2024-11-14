const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const product = await Product.findById(id).populate("category"); // Fetch the product by ID and populate the category

    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // If product not found, return 404
    }

    res.json(product); // Return the found product
  } catch (error) {
    res.status(500).json({ message: "Server error" }); // Handle any server errors
  }
};

// Add a new category
exports.addCategory = async (req, res) => {
  const { name } = req.body;

  const category = new Category({ name });

  try {
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, oldPrice, price, category } = req.body;

  const product = new Product({
    name,
    oldPrice,
    price,
    category,
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add multiple products

exports.addMultipleProducts = async (req, res) => {
  const productsData = req.body.products; // Expecting an array of product objects

  try {
    const savedProducts = await Product.insertMany(productsData);
    res.status(201).json(savedProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
