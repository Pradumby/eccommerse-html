// Payments.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Payments = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/payment-methods"
        );
        setPaymentMethods(response.data.methods);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div>
      <h3>Payment Methods</h3>
      <ul>
        {paymentMethods.map((method) => (
          <li key={method.id}>
            <p>Type: {method.type}</p>
            {method.last4 && <p>Card Ending: {method.last4}</p>}
            {method.email && <p>Email: {method.email}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
