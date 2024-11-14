const Order = require("../models/OrderModel");

// Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("items.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assuming you have a User and Order model and that `userId` is part of your Order schema

exports.getOrdersByUserId = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const orders = await Order.find({ userId })
      .populate("userId")
      .populate("items.productId");

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Add a new order
exports.addOrder = async (req, res) => {
  const { userId, shippingAddress, cartItems, totalAmount } = req.body;

  // Check if all required fields are present
  if (!userId || !cartItems || !shippingAddress || !totalAmount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Initialize a new Order instance
  const order = new Order({
    userId,
    items: cartItems,
    address: shippingAddress,
    amount: totalAmount,
    payment: false, // Default to false, can be updated later after payment
    status: "Food Processing", // Default status
  });

  try {
    // Save the order to the database
    const savedOrder = await order.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Fetch an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId)
      .populate("userId")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    return res
      .status(400)
      .json({ message: "Order ID and status are required" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated order
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { orderId, success, paymentMethod } = req.body;
  try {
    if (success == "true") {
      await Order.findByIdAndUpdate(orderId, {
        payment: true,
        paymentType: paymentMethod,
      });
      res.json({
        success: true,
        message: "Paid",
      });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Not Paid",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};
