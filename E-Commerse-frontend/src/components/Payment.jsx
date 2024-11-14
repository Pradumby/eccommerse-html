// import React, { useState, useEffect } from "react";
// import shipping_icon from "../assets/shipping.png";
// import payment_icon from "../assets/payment.png";
// import prod_img from "../assets/prod-img.png";
// import cards_img from "../assets/cards.png";
// import { useCart } from "../contexts/CartContext";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";

// const Payment = () => {
//   const [paymentMethod, setPaymentMethod] = useState("credit");
//   const [address, setAddress] = useState(null);
//   const { cartItems } = useCart();
//   const { orderId } = useParams();

//   useEffect(() => {
//     const fetchAddress = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/orders/get"
//         );
//         setAddress(response.data[0].address);
//       } catch (error) {
//         console.error("Error fetching address:", error);
//       }
//     };
//     fetchAddress();
//   }, []);

//   const handlePaymentMethodChange = (event) => {
//     setPaymentMethod(event.target.value);
//   };

//   const handlePlaceOrder = async (event) => {
//     event.preventDefault(); // Prevent page reload
//     try {
//       console.log("Selected payment method:", paymentMethod); // Debugging the selected payment method

//       // Handle different payment methods
//       if (paymentMethod === "credit") {
//         console.log("Processing credit card payment...");

//         const stripe = await loadStripe(
//           "pk_test_51QDRREFtdmiyWuElPXaAcM2pffD8C5qyKvWd2YsdHLbLvFi1NUlkdSmzF03lRsPLV6ZXRx2DiTYNR4InjeNPFi8L00UdzzKqjm"
//         );
//         const response = await axios.post(
//           "http://localhost:5000/api/orders/place",
//           {
//             cartItems,
//             paymentMethod,
//             orderId,
//           }
//         );

//         console.log("Stripe response:", response.data); // Log response from server

//         if (response.data.success) {
//           const { sessionId } = response.data;
//           const result = await stripe.redirectToCheckout({ sessionId });

//           if (result.error) {
//             console.error(
//               "Error during Stripe checkout:",
//               result.error.message
//             );
//           }
//         } else {
//           console.error("Error placing order:", response.data.message);
//         }
//       } else if (paymentMethod === "paypal") {
//         console.log("Processing PayPal payment...");

//         const response = await axios.post(
//           "http://localhost:5000/api/orders/place",
//           {
//             cartItems,
//             paymentMethod,
//             orderId,
//           }
//         );

//         console.log("PayPal response:", response.data); // Log PayPal approval URL

//         if (response.data.success && response.data.approvalUrl) {
//           // Ensure PayPal URL is available before redirecting
//           console.log(
//             "Redirecting to PayPal approval URL:",
//             response.data.approvalUrl
//           );
//           window.location.href = response.data.approvalUrl;
//         } else {
//           console.error(
//             "Failed to initiate PayPal payment:",
//             response.data.error
//           );
//           alert("An error occurred. Please try again.");
//         }
//       } else if (paymentMethod === "cod") {
//         console.log("Processing Cash on Delivery...");

//         const response = await axios.post(
//           "http://localhost:5000/api/orders/create",
//           {
//             cartItems,
//             paymentMethod,
//             orderId,
//           }
//         );

//         if (response.data.success) {
//           alert("Order placed successfully with Cash on Delivery option.");
//           window.location.href = "/order-confirmation"; // Redirect to confirmation page
//         } else {
//           console.error(
//             "Error placing Cash on Delivery order:",
//             response.data.message
//           );
//         }
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="breadcrumb">
//         <div className="wrapper">
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/checkout">Checkout</Link>
//             </li>
//             <li>
//               <Link to="/payment">Payment</Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="container">
//         <section className="cart">
//           <div className="wrapper">
//             <div className="checkout-tab">
//               <ul>
//                 <li>
//                   <Link to="/checkout">
//                     <img src={shipping_icon} alt="Shipping" />
//                     Shipping
//                   </Link>
//                 </li>
//                 <li className="active">
//                   <a href="#">
//                     <img src={payment_icon} alt="Payment" />
//                     Payment
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         <section>
//           <div className="wrapper">
//             <div className="checkout-wrap">
//               <div className="checkout-dtl">
//                 <div className="checkout-step active">
//                   <div className="step-title">
//                     <h6>1. Shipping Address</h6>
//                     <a href="#" className="edit-btn">
//                       Edit
//                     </a>
//                   </div>
//                   <div className="shipping-adres">
//                     <div className="address">
//                       <label>Email</label>
//                       <p>{address?.email || "Loading..."}</p>
//                     </div>
//                     <div className="address">
//                       <label>Shipping Address*</label>
//                       <p>
//                         {address
//                           ? `${address.name}, ${address.streetAddress}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`
//                           : "Loading..."}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="checkout-step active">
//                   <div className="step-title">
//                     <h6>2. Payment</h6>
//                     <a href="#" className="edit-btn">
//                       Edit
//                     </a>
//                   </div>
//                   <div className="payment">
//                     <ul className="payment-opt">
//                       <li>
//                         <input
//                           type="radio"
//                           name="paymentopt"
//                           value="credit"
//                           checked={paymentMethod === "credit"}
//                           onChange={handlePaymentMethodChange}
//                         />
//                         Credit Card
//                       </li>
//                       <li>
//                         <input
//                           type="radio"
//                           name="paymentopt"
//                           value="paypal"
//                           checked={paymentMethod === "paypal"}
//                           onChange={handlePaymentMethodChange}
//                         />
//                         PayPal
//                       </li>
//                       <li>
//                         <input
//                           type="radio"
//                           name="paymentopt"
//                           value="cod"
//                           checked={paymentMethod === "cod"}
//                           onChange={handlePaymentMethodChange}
//                         />
//                         Cash on Delivery
//                       </li>
//                     </ul>

//                     {paymentMethod === "credit" && (
//                       <div className="payment-select crdt-card">
//                         <div className="form-wrap">
//                           <ul className="form-list">
//                             <li>
//                               <input
//                                 type="text"
//                                 className="text"
//                                 placeholder="Card Holder Name*"
//                               />
//                             </li>
//                             <li>
//                               <input
//                                 type="text"
//                                 className="text"
//                                 placeholder="Card Number*"
//                               />
//                             </li>
//                             <li className="half">
//                               <input
//                                 type="text"
//                                 className="text"
//                                 placeholder="MM/YY"
//                               />
//                             </li>
//                             <li className="half">
//                               <input
//                                 type="text"
//                                 className="text"
//                                 placeholder="CVV"
//                               />
//                             </li>
//                             <li>
//                               <div className="img-box">
//                                 <img src={cards_img} alt="Payment Cards" />
//                               </div>
//                             </li>
//                             <li>
//                               <button
//                                 type="button"
//                                 onClick={handlePlaceOrder}
//                                 className="btn"
//                               >
//                                 Place Order
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     )}

//                     {paymentMethod === "paypal" && (
//                       <div className="payment-select paypal">
//                         <p>PayPal Payment Form Coming Soon...</p>
//                         <button
//                           type="button"
//                           onClick={handlePlaceOrder}
//                           className="btn"
//                         >
//                           Place Order
//                         </button>
//                       </div>
//                     )}

//                     {paymentMethod === "cod" && (
//                       <div className="payment-select cod">
//                         <p>Cash on Delivery Selected</p>
//                         <button
//                           type="button"
//                           onClick={handlePlaceOrder}
//                           className="btn"
//                         >
//                           Place Order
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="order-summary">
//                 <h4>Order Summary</h4>
//                 <ul className="min-cart">
//                   {cartItems.map((item, index) => (
//                     <li key={index}>
//                       <div className="item">
//                         <div className="img-box">
//                           <img
//                             src={item.imageUrl || prod_img}
//                             alt={item.name}
//                           />
//                         </div>
//                         <div className="data">
//                           <span className="item-name">{item.name}</span>
//                           <span>
//                             <label>Qty:</label> {item.quantity}
//                           </span>
//                         </div>
//                       </div>
//                       <p>₹{item.price}</p>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="total">
//                   <p>
//                     <span>Subtotal</span>
//                     <span>
//                       ₹
//                       {cartItems.reduce(
//                         (total, item) => total + item.price * item.quantity,
//                         0
//                       )}
//                     </span>
//                   </p>
//                   <p>
//                     <span>Sale Tax</span>
//                     <span>₹8.50</span>
//                   </p>
//                   <p>
//                     <span>Shipping</span>
//                     <span>₹10.50</span>
//                   </p>
//                 </div>
//                 <div className="total">
//                   <p>
//                     <span>Total</span>
//                     <span>
//                       ₹
//                       {cartItems.reduce(
//                         (total, item) => total + item.price * item.quantity,
//                         0
//                       ) +
//                         8.5 +
//                         10.5}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import React, { useState, useEffect } from "react";
import shipping_icon from "../assets/shipping.png";
import payment_icon from "../assets/payment.png";
import prod_img from "../assets/prod-img.png";
import cards_img from "../assets/cards.png";
import { useCart } from "../contexts/CartContext";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [address, setAddress] = useState(null);
  const { cartItems, clearCart } = useCart();
  const { orderId } = useParams();
  const navigate = useNavigate();
  console.log("----------", paymentMethod);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/orders/get"
        );
        setAddress(response.data[0].address);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchAddress();
  }, []);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCreditCardPayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51QDRREFtdmiyWuElPXaAcM2pffD8C5qyKvWd2YsdHLbLvFi1NUlkdSmzF03lRsPLV6ZXRx2DiTYNR4InjeNPFi8L00UdzzKqjm"
      );
      const response = await axios.post(
        "http://localhost:5000/api/payment/credit-card",
        {
          cartItems,
          paymentMethod: "credit",
          orderId,
        }
      );
      if (response.data.success) {
        const { sessionId } = response.data;
        const result = await stripe.redirectToCheckout({ sessionId });
        if (result.error) {
          console.error("Error during Stripe checkout:", result.error.message);
        }
      } else {
        console.error("Error placing order:", response.data.message);
      }
    } catch (error) {
      console.error("Error processing credit card payment:", error);
    }
  };

  const handlePayPalPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/paypal",
        {
          cartItems,
          paymentMethod: "paypal",
          orderId,
        }
      );
      console.log(response.data.approvalUrl);
      if (response.data.success && response.data.approvalUrl) {
        window.location.href = response.data.approvalUrl;
      } else {
        console.error(
          "Failed to initiate PayPal payment:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Error processing PayPal payment:", error);
    }
  };

  const handleCashOnDelivery = async () => {
    const confirmCOD = window.confirm("Confirm your Cash on Delivery order?");
    if (!confirmCOD) return;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/cod",
        {
          cartItems,
          paymentMethod: "cod",
          orderId,
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        clearCart();
        navigate("/cart");
        // window.location.href = "/order-confirmation";
      } else {
        console.error(
          "Error placing Cash on Delivery order:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error processing Cash on Delivery:", error);
    }
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    if (paymentMethod === "credit") {
      handleCreditCardPayment();
    } else if (paymentMethod === "paypal") {
      handlePayPalPayment();
    } else if (paymentMethod === "cod") {
      handleCashOnDelivery();
    }
  };

  return (
    <div>
      <div className="breadcrumb">
        <div className="wrapper">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link to="/payment">Payment</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <section className="cart">
          <div className="wrapper">
            <div className="checkout-tab">
              <ul>
                <li>
                  <Link to="/checkout">
                    <img src={shipping_icon} alt="Shipping" />
                    Shipping
                  </Link>
                </li>
                <li className="active">
                  <Link to="/payment/orderId">
                    <img src={payment_icon} alt="payment" /> Payment
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="wrapper">
            <div className="checkout-wrap">
              <div className="checkout-dtl">
                <div className="checkout-step active">
                  <div className="step-title">
                    <h6>1. Shipping Address</h6>
                    <a href="#" className="edit-btn">
                      Edit
                    </a>
                  </div>
                  <div className="shipping-adres">
                    <div className="address">
                      <label>Email</label>
                      <p>{address?.email || "Loading..."}</p>
                    </div>
                    <div className="address">
                      <label>Shipping Address*</label>
                      <p>
                        {address
                          ? `${address.name}, ${address.streetAddress}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="checkout-step active">
                  <div className="step-title">
                    <h6>2. Payment</h6>
                    <a href="#" className="edit-btn">
                      Edit
                    </a>
                  </div>
                  <div className="payment">
                    <ul className="payment-opt">
                      <li>
                        <input
                          type="radio"
                          name="paymentopt"
                          value="credit"
                          checked={paymentMethod === "credit"}
                          onChange={handlePaymentMethodChange}
                        />
                        Credit Card
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="paymentopt"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={handlePaymentMethodChange}
                        />
                        PayPal
                      </li>
                      <li>
                        <input
                          type="radio"
                          name="paymentopt"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={handlePaymentMethodChange}
                        />
                        Cash on Delivery
                      </li>
                    </ul>

                    {paymentMethod === "credit" && (
                      <div className="payment-select crdt-card">
                        <div className="form-wrap">
                          <ul className="form-list">
                            <li>
                              <input
                                type="text"
                                className="text"
                                placeholder="Card Holder Name*"
                              />
                            </li>
                            <li>
                              <input
                                type="text"
                                className="text"
                                placeholder="Card Number*"
                              />
                            </li>
                            <li className="half">
                              <input
                                type="text"
                                className="text"
                                placeholder="MM/YY"
                              />
                            </li>
                            <li className="half">
                              <input
                                type="text"
                                className="text"
                                placeholder="CVV"
                              />
                            </li>
                            <li>
                              <div className="img-box">
                                <img src={cards_img} alt="Payment Cards" />
                              </div>
                            </li>
                            <li>
                              <button
                                type="button"
                                onClick={handlePlaceOrder}
                                className="btn"
                              >
                                Place Order
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="payment-select paypal">
                        <p>PayPal Payment Form Coming Soon...</p>
                        <button
                          type="button"
                          onClick={handlePlaceOrder}
                          className="btn"
                        >
                          Place Order
                        </button>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="payment-select cod">
                        <p>Cash on Delivery Selected</p>
                        <button
                          type="button"
                          onClick={handlePlaceOrder}
                          className="btn"
                        >
                          Place Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="order-summary">
                <h4>Order Summary</h4>
                <ul className="min-cart">
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      <div className="item">
                        <div className="img-box">
                          <img
                            src={item.imageUrl || prod_img}
                            alt={item.name}
                          />
                        </div>
                        <div className="data">
                          <span className="item-name">{item.name}</span>
                          <span>
                            <label>Qty:</label> {item.quantity}
                          </span>
                        </div>
                      </div>
                      <p>₹{item.price}</p>
                    </li>
                  ))}
                </ul>
                <div className="total">
                  <p>
                    <span>Subtotal</span>
                    <span>
                      ₹
                      {cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}
                    </span>
                  </p>
                  <p>
                    <span>Sale Tax</span>
                    <span>₹8.50</span>
                  </p>
                  <p>
                    <span>Shipping</span>
                    <span>₹10.50</span>
                  </p>
                </div>
                <div className="total">
                  <p>
                    <span>Total</span>
                    <span>
                      ₹
                      {cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      ) +
                        8.5 +
                        10.5}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payment;
