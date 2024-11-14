const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Replace with actual Stripe secret key
const Order = require("../models/OrderModel"); // Assuming you have an Order model

const frontend_url = "http://localhost:5173"; // Frontend URL for redirects

const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: "sandbox", // Change to "live" for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});

// PayPal Payment
exports.processPayPalPayment = async (req, res) => {
  const { cartItems, orderId, paymentMethod } = req.body;
  const INR_TO_USD_RATE = 0.012; // Example exchange rate, adjust as needed

  const totalAmountInINR = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const totalAmountInUSD = (totalAmountInINR * INR_TO_USD_RATE).toFixed(2);

  const paymentDetails = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    transactions: [
      {
        amount: { total: totalAmountInUSD, currency: "USD" },
        description: "Order Payment",
      },
    ],
    redirect_urls: {
      return_url: `${frontend_url}/verify-payment?success=true&orderId=${orderId}&paymentMethod=${paymentMethod}`,
      cancel_url: `${frontend_url}/verify-payment?success=false&orderId=${orderId}&paymentMethod=${paymentMethod}`,
    },
  };

  paypal.payment.create(paymentDetails, (error, payment) => {
    if (error)
      return res
        .status(500)
        .json({ success: false, message: "PayPal payment error", error });
    const approvalUrl = payment.links.find(
      (link) => link.rel === "approval_url"
    )?.href;
    return res.json({ success: true, approvalUrl });
  });
};

// Stripe Card Payment
exports.processCardPayment = async (req, res) => {
  const { cartItems, orderId, paymentMethod } = req.body;
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  lineItems.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "shipping charge",
      },
      unit_amount: 10.5 * 100,
    },
    quantity: 1,
  });

  lineItems.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Sale text",
      },
      unit_amount: 8.5 * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${frontend_url}/verify-payment?success=true&orderId=${orderId}&paymentMethod=${paymentMethod}`,
    cancel_url: `${frontend_url}/verify-payment?success=false&orderId=${orderId}&paymentMethod=${paymentMethod}`,
  });

  return res.json({ success: true, sessionId: session.id });
};

// Cash on Delivery (COD) Payment
exports.processCODPayment = async (req, res) => {
  const { orderId, paymentMethod } = req.body;
  const order = await Order.findById(orderId);
  if (!order)
    return res.status(404).json({ success: false, message: "Order not found" });

  order.payment = true;
  order.status = "Food Processing";
  order.paymentType = paymentMethod;

  await order.save();
  return res.json({
    success: true,
    message: "Order placed successfully with Cash on Delivery",
  });
};
