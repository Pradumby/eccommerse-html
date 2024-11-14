// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials (like cookies or authorization headers)
  })
);

app.use(express.json());

connectDB();

app.use("/auth", authRoutes);

app.use("/api", productRoutes);

app.use("/api", orderRoutes);

app.use("/api", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
