// App.js
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Account from "./components/Account/Account";
import ShopPage from "./components/ShopPage";
import About from "./components/AboutProduct/About";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Blog from "./components/AboutProduct/Blog";
import LoginPopup from "./components/LoginPopup/Loginpopup";
import ResetPassword from "./components/LoginPopup/ResetPassword";
import { CartProvider } from "./contexts/CartContext";
import VerifyPament from "./components/VerifyPament";

const App = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) setToken(storedToken);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUsername("");
    // alert("Logged out successfully!");
    navigate("/");
  };

  const handleLogin = (username) => {
    setToken(localStorage.getItem("token"));
    setUsername(username);
    setShowLogin(false);
  };

  return (
    <CartProvider>
      <Header
        token={token}
        setShowLogin={setShowLogin}
        username={username}
        handleLogout={handleLogout}
      />
      {showLogin && (
        <LoginPopup onLogin={handleLogin} setShowLogin={setShowLogin} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment/:orderId" element={<Payment />} />
        <Route path="/verify-payment" element={<VerifyPament />} />
        <Route path="/account" element={<Account />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
};

export default App;
