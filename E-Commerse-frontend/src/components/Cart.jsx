import React from "react";
import { useCart } from "../contexts/CartContext";
import prod_img1 from "../assets/prod-img1.jpg";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalPrice, updateCartItemQuantity } =
    useCart();

  // Function to increase quantity
  const increaseQuantity = (item) => {
    updateCartItemQuantity(item._id, item.quantity + 1);
  };

  // Function to decrease quantity
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item._id, item.quantity - 1);
    } else {
      removeFromCart(item._id);
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
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Cart Section */}
      <div className="container">
        <section className="cart">
          <div className="wrapper">
            <h2 className="title">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <table className="cart-list">
                  <thead>
                    <tr className="cart-head">
                      <th className="col">Item</th>
                      <th className="col">Price</th>
                      <th className="col">Qty</th>
                      <th className="col">Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item._id}>
                        <td className="col">
                          <div className="item">
                            <div className="img-box">
                              <img src={prod_img1} alt={item.name} />
                            </div>
                            <div className="data">
                              <span>{item.name}</span>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="col">
                          <span>₹{item.price.toFixed(2)}</span>
                        </td>
                        <td className="col">
                          <div className="qty-btn">
                            <button onClick={() => decreaseQuantity(item)}>
                              -
                            </button>
                            <input
                              type="number"
                              name="qty"
                              id={`qty-${index}`}
                              value={item.quantity}
                              readOnly
                            />
                            <button onClick={() => increaseQuantity(item)}>
                              +
                            </button>
                          </div>
                        </td>
                        <td className="col">
                          <span>
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="close"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="total-wrap">
                  <h6 className="total">
                    Subtotal: ₹{getTotalPrice().toFixed(2)}
                  </h6>
                  <Link className="btn" to="/checkout">
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
