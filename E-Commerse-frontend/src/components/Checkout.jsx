import React, { useState } from "react";
import shipping_icon from "../assets/shipping.png";
import prod_img from "../assets/prod-img.png";
import payment_icon from "../assets/payment.png";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice } = useCart();
  const [errors, setErrors] = useState("");

  // State for shipping address form
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    email: "",
    streetAddress: "",
    area: "",
    country: "",
    city: "",
    postalCode: "",
    state: "",
    mobile: "",
    isBillingSame: false,
  });

  // Calculate totals
  const tax = 8.5;
  const shipping = 10.5;
  const subtotal = getTotalPrice(); // This function should return the total of all items in the cart
  const total = subtotal + tax + shipping;

  // Handle shipping address change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle checkbox change for billing and shipping address being the same
  const handleCheckboxChange = (e) => {
    setShippingAddress((prevState) => ({
      ...prevState,
      isBillingSame: e.target.checked,
    }));
  };

  // Handle Save & Continue

  const handleSaveContinue = async () => {
    // Validate the shipping address form fields
    const newErrors = {};

    if (!shippingAddress.name) newErrors.name = "Name is required";
    if (!shippingAddress.email) newErrors.email = "Email is required";
    if (!shippingAddress.streetAddress)
      newErrors.streetAddress = "Street Address is required";
    if (!shippingAddress.country) newErrors.country = "Country is required";
    if (!shippingAddress.city) newErrors.city = "City is required";
    if (!shippingAddress.postalCode)
      newErrors.postalCode = "Postal Code is required";
    if (!shippingAddress.state) newErrors.state = "State is required";
    if (!shippingAddress.mobile) newErrors.mobile = "Mobile number is required";
    // Check if the checkbox is checked
    if (!shippingAddress.isBillingSame)
      newErrors.isBillingSame =
        "Please confirm billing and shipping addresses are the same";

    // Additional validation
    if (shippingAddress.email && !/\S+@\S+\.\S+/.test(shippingAddress.email)) {
      newErrors.email = "Invalid email format";
    }
    if (
      shippingAddress.postalCode &&
      !/^\d{5,10}$/.test(shippingAddress.postalCode)
    ) {
      newErrors.postalCode = "Postal code must be 5-10 digits";
    }
    if (shippingAddress.mobile && !/^\d{10}$/.test(shippingAddress.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Display errors if validation fails
      return;
    }

    // Prepare data for API call if validation is successful
    const orderData = {
      userId: localStorage.getItem("id"),
      shippingAddress,
      cartItems,
      totalAmount: total,
    };
    // console.log(orderData);

    try {
      // Save the shipping information and cart details to the backend
      const response = await axios.post(
        "http://localhost:5000/api/orders/create",
        orderData
      );
      if (response.data.success) {
        const orderId = response.data.order._id;
        alert(response.data.message);
        navigate(`/payment/${orderId}`);
      }
    } catch (error) {
      console.error("Error saving shipping information:", error);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
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
              <Link to="/checkout">Shipping</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Checkout Section */}
      <div className="container">
        <section className="cart">
          <div className="wrapper">
            <div className="checkout-tab">
              <ul>
                <li className="active">
                  <Link to="/checkout">
                    <img src={shipping_icon} alt="Shipping" />
                    Shipping
                  </Link>
                </li>
                <li>
                  {/* Conditionally render link based on form completion */}
                  <Link to="/payment/orderId">
                    <img src={payment_icon} alt="Payment" />
                    Payment
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
                    <div className="form-wrap">
                      <ul className="form-list">
                        <li>
                          <label>Name*</label>
                          {errors.name && (
                            <p className="error">{errors.name}</p>
                          )}
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter Your Name"
                            value={shippingAddress.name}
                            onChange={handleChange}
                          />
                        </li>
                        <li>
                          <label>Email*</label>
                          {errors.email && (
                            <p className="error">{errors.email}</p>
                          )}
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Your Email"
                            value={shippingAddress.email}
                            onChange={handleChange}
                          />
                        </li>
                        <li>
                          <label>Street Address*</label>
                          {errors.streetAddress && (
                            <p className="error">{errors.streetAddress}</p>
                          )}
                          <input
                            type="text"
                            name="streetAddress"
                            placeholder="House No/Street"
                            value={shippingAddress.streetAddress}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            name="area"
                            placeholder="Area / Landmark"
                            value={shippingAddress.area}
                            onChange={handleChange}
                          />
                        </li>
                        <li className="half">
                          <label>Country*</label>
                          {errors.country && (
                            <p className="error">{errors.country}</p>
                          )}
                          <input
                            type="text"
                            name="country"
                            placeholder="Enter Your Country"
                            value={shippingAddress.country}
                            onChange={handleChange}
                          />
                        </li>
                        <li className="half">
                          <label>City*</label>
                          {errors.city && (
                            <p className="error">{errors.city}</p>
                          )}
                          <input
                            type="text"
                            name="city"
                            placeholder="Enter Your City"
                            value={shippingAddress.city}
                            onChange={handleChange}
                          />
                        </li>
                        <li className="half">
                          <label>Zip/Postal Code*</label>
                          {errors.postalCode && (
                            <p className="error">{errors.postalCode}</p>
                          )}
                          <input
                            type="text"
                            name="postalCode"
                            placeholder="Eg: 422010"
                            value={shippingAddress.postalCode}
                            onChange={handleChange}
                          />
                        </li>
                        <li className="half">
                          <label>State*</label>
                          {errors.state && (
                            <p className="error">{errors.state}</p>
                          )}
                          <input
                            type="text"
                            name="state"
                            placeholder="Enter Your State"
                            value={shippingAddress.state}
                            onChange={handleChange}
                          />
                        </li>
                        <li>
                          <label>Mobile No*</label>
                          {errors.mobile && (
                            <p className="error">{errors.mobile}</p>
                          )}
                          <input
                            type="text"
                            name="mobile"
                            placeholder="Enter Your Mobile No"
                            value={shippingAddress.mobile}
                            onChange={handleChange}
                          />
                        </li>
                        <li className="check-input">
                          <input
                            type="checkbox"
                            className="chk"
                            checked={shippingAddress.isBillingSame}
                            onChange={handleCheckboxChange}
                          />
                          <label>
                            My billing and shipping address are the same.
                          </label>
                          {errors.isBillingSame && (
                            <p className="error">{errors.isBillingSame}</p>
                          )}
                        </li>
                        <li>
                          <input
                            type="button"
                            className="btn"
                            value="SAVE & CONTINUE"
                            onClick={handleSaveContinue}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Payment Step */}
                <div className="checkout-step">
                  <div className="step-title">
                    <h6>2. Payment</h6>
                    <a href="payment.component.html" className="edit-btn">
                      Edit
                    </a>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <h4>Order Summary</h4>
                <ul className="min-cart">
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      <div className="item">
                        <div className="img-box">
                          <img src={item.image || prod_img} alt={item.name} />
                        </div>
                        <div className="data">
                          <span className="item-name">{item.name}</span>
                          <span>
                            <label>Qty:</label> {item.quantity}
                          </span>
                        </div>
                      </div>
                      <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
                <div className="total">
                  <p>
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>Sale Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </p>
                </div>
                <div className="total">
                  <p>
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
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

export default Checkout;
