import React, { useState, useEffect } from "react";
import axios from "axios";
import prod_img from "../../assets/prod-img.png";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("id");

        if (!userId) {
          console.error("User ID is missing in localStorage");
          return;
        }

        const response = await axios.post("http://localhost:5000/api/orders", {
          userId: userId,
        });
        console.log(response.data.orders);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle tracking the order
  const trackOrder = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/orders/${orderId}`
      );
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error tracking order:", error);
    }
  };

  return (
    <div className="container">
      <section className="cart">
        <div className="wrapper">
          <h2 className="title">My Orders</h2>
          {orders.length === 0 ? (
            <p>You have no orders</p>
          ) : (
            <>
              <table className="cart-list">
                <thead>
                  <tr className="cart-head">
                    <th className="col">Items</th>
                    <th className="col">Price</th>
                    <th className="col">Qty</th>
                    <th className="col">Status</th>
                    <th className="col">Payment Type</th>
                    <th className="col">Total Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="col">
                        <div className="item">
                          {order.items.map((item, index) => (
                            <div key={item._id}>
                              <p>{item.name}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="col">
                        <span>₹{order.amount.toFixed(2)}</span>
                      </td>
                      <td className="col">
                        <span>
                          {order.items.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}
                        </span>
                      </td>
                      <td className="col">
                        <span>{order.status}</span>
                      </td>
                      <td className="col">
                        <span>{order.paymentType}</span>
                      </td>
                      <td className="col">
                        <span>₹{order.amount.toFixed(2)}</span>
                      </td>
                      <td>
                        <button className="close">Track Order</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </section>

      {/* Optionally, display order details in a modal */}
      {orderDetails && (
        <div className="order-details-modal">
          <h3>Order Details</h3>
          <p>
            <strong>Product Name:</strong> {orderDetails.productName}
          </p>
          <p>
            <strong>Description:</strong> {orderDetails.productDescription}
          </p>
          <p>
            <strong>Price:</strong> ₹{orderDetails.price}
          </p>
          <p>
            <strong>Status:</strong> {orderDetails.status}
          </p>
          <p>
            <strong>Tracking ID:</strong> {orderDetails.trackingId}
          </p>
          <button onClick={() => setOrderDetails(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
