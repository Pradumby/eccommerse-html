import React, { useState } from "react";
import MyDetails from "./MyDetails"; // Ensure you create this component
import MyAddress from "./MyAddress"; // Create this component for Address
import MyOrders from "./MyOrders"; // Create this component for Orders
import Payments from "./Payments"; // Create this component for Payments

const Account = () => {
  // State to manage the active section
  const [activeSection, setActiveSection] = useState("details");

  // Function to render the appropriate section based on the active state
  const renderSection = () => {
    switch (activeSection) {
      case "details":
        return <MyDetails />;
      case "address":
        return <MyAddress />;
      case "orders":
        return <MyOrders />;
      case "payments":
        return <Payments />;
      default:
        return <MyDetails />;
    }
  };

  return (
    <div>
      <div className="breadcrumb">
        <div className="wrapper">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/account">MY ACCOUNT</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <section>
          <h2 className="title">My Account</h2>
          <div className="wrapper">
            <div className="account-wrap">
              <div className="sidebar">
                <ul className="sidbar-links">
                  <li className={activeSection === "details" ? "active" : ""}>
                    <button onClick={() => setActiveSection("details")}>
                      My Details
                    </button>
                  </li>
                  <li className={activeSection === "address" ? "active" : ""}>
                    <button onClick={() => setActiveSection("address")}>
                      My Address
                    </button>
                  </li>
                  <li className={activeSection === "orders" ? "active" : ""}>
                    <button onClick={() => setActiveSection("orders")}>
                      My Orders
                    </button>
                  </li>
                  <li className={activeSection === "payments" ? "active" : ""}>
                    <button onClick={() => setActiveSection("payments")}>
                      Payments
                    </button>
                  </li>
                  <li className={activeSection === "logout" ? "active" : ""}>
                    <button onClick={() => setActiveSection("logout")}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>

              <div className="dtl-wrap">
                <div className="my-dtl" id="my-dtl">
                  {renderSection()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Account;
