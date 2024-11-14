import React, { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

const VerifyPament = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const paymentMethod = searchParams.get("paymentMethod");
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const verifyPayment = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/orders/verifyPayment",
      {
        success,
        orderId,
        paymentMethod,
      }
    );
    if (response.data.success) {
      navigate("/cart");
      clearCart();
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="verify-payment">
      <dir className="spinner">Verifying payment...</dir>
    </div>
  );
};

export default VerifyPament;
