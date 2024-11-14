import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search-ico.png";
import cartIcon from "../../assets/cart.png";
import userIcon from "../../assets/user-ico.png";
import logoutIcon from "../../assets/logout_icon.jpg";
import "./Header.css";

const Header = ({ token, setShowLogin, username, handleLogout }) => {
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (token) {
      navigate("/account");
    } else {
      setShowLogin(true);
    }
  };

  // const handleLogout = () => {
  //   localStorage.clear();
  //   alert("Logged out successfully!");
  //   navigate("/");
  // };

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <img src={logo} alt="Logo" />
        </Link>
        <nav className="header-nav">
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
        <div className="header-icons">
          <Link to="/search" className="icon-button">
            <img src={searchIcon} alt="Search" />
          </Link>
          <Link to="/cart" className="icon-button">
            <img src={cartIcon} alt="Cart" />
          </Link>
          {token ? (
            <>
              <button onClick={handleUserIconClick} className="icon-button">
                <img src={userIcon} alt="User" />
              </button>
              <span className="username">
                {username.charAt(0).toUpperCase() + username.slice(1)}
              </span>
              <button
                onClick={handleLogout}
                className="icon-button logout-button"
              >
                <img src={logoutIcon} alt="Logout" />
              </button>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)} className="login-button">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
