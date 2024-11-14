import React, { useState } from "react";
import axios from "axios"; // Import Axios
import google_icon from "../../assets/google-ico.png";
import facebook_icon from "../../assets/fb-ico.png";
import { Link } from "react-router-dom";
import "./LoginPopup.css";
import close_icon from "../../assets/x-mark.png"; // Add your close icon path here

const LoginPopup = ({ setShowLogin, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State for forgot password mode
  const [resetEmail, setResetEmail] = useState(""); // State for email in reset password

  const handleClose = () => {
    setShowLogin(false);
    setError(""); // Clear error when closing
    setIsForgotPassword(false); // Reset forgot password state
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match!"); // Update error state
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        mobileNo,
      });

      if (response.data.success) {
        alert(response.data.message);
        setIsSignUp(false);
        setEmail("");
        setPassword("");
      } else {
        setError(response.data.message); // Display error message from response
      }
    } catch (err) {
      console.error(err.response.data); // Log server response
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Show specific error message
      } else {
        setError("An error occurred. Please try again."); // General error message
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        const user = response.data.user;
        const fullName = `${user.firstName} ${user.lastName}`;

        // Store the token and full name in localStorage
        localStorage.setItem("id", user._id);
        localStorage.setItem("token", token);
        localStorage.setItem("username", fullName); // Store full name in localStorage

        setShowLogin(false);
        onLogin(fullName); // Call onLogin prop with full name
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        {
          email: resetEmail,
        }
      );
      if (response.data.success) {
        alert("Password reset link sent to your email.");
        setResetEmail(""); // Clear the email field after sending
        setIsForgotPassword(false); // Close forgot password mode
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again."); // Update error state
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-container">
        <button className="close-button" onClick={handleClose}>
          <img src={close_icon} alt="Close" />
        </button>
        <section className="auth-section">
          <h2 className="title">
            {isForgotPassword
              ? "Reset Password"
              : isSignUp
              ? "Sign Up"
              : "Login"}
          </h2>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
          <div className="wrapper">
            <div className="auth-wrap">
              <div className="using-social">
                <div className="step-title">
                  <h6>Use Your Social Account</h6>
                </div>
                <div className="social-option">
                  <Link to="#">
                    <img src={google_icon} alt="Google" />
                  </Link>
                  <Link to="#">
                    <img src={facebook_icon} alt="Facebook" />
                  </Link>
                  <p>
                    Signing up with social is quick and easy. No extra passwords
                    to remember.
                  </p>
                </div>
              </div>

              <div className="using-email">
                <div className="step-title">
                  <h6>Use Your Email</h6>
                </div>
                <div className="auth-form">
                  {isForgotPassword ? (
                    // Render forgot password form
                    <form onSubmit={handleForgotPassword}>
                      <div className="form-wrap">
                        <ul className="form-list">
                          <li>
                            <label>Email</label>
                            <input
                              type="email"
                              placeholder="Email"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              required
                            />
                          </li>
                          <li>
                            <button type="submit" className="btn-login">
                              Send Reset Link
                            </button>
                          </li>
                        </ul>
                      </div>
                    </form>
                  ) : (
                    // Render login/sign up form
                    <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
                      <div className="form-wrap">
                        <ul className="form-list">
                          {isSignUp && (
                            <>
                              <li className="form-item">
                                <label className="form-label">First Name</label>
                                <input
                                  type="text"
                                  placeholder="First Name"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  required
                                  className="form-input"
                                />
                              </li>
                              <li className="form-item">
                                <label className="form-label">Last Name</label>
                                <input
                                  type="text"
                                  placeholder="Last Name"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  required
                                  className="form-input"
                                />
                              </li>
                              <li className="form-item">
                                <label className="form-label">
                                  Date of Birth
                                </label>
                                <input
                                  type="date"
                                  placeholder="Date of Birth"
                                  value={dateOfBirth}
                                  onChange={(e) =>
                                    setDateOfBirth(e.target.value)
                                  }
                                  required
                                  className="form-input"
                                />
                              </li>
                              <li className="form-item">
                                <label className="form-label">
                                  Mobile Number
                                </label>
                                <input
                                  type="tel"
                                  placeholder="Mobile Number"
                                  value={mobileNo}
                                  onChange={(e) => setMobileNo(e.target.value)}
                                  required
                                  className="form-input"
                                  pattern="^[0-9]{10}$" // This pattern enforces 10 digit phone numbers
                                  maxLength="10"
                                />
                              </li>
                            </>
                          )}
                          <li className="form-item">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="form-input"
                            />
                          </li>
                          <li className="form-item">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="form-input"
                            />
                          </li>
                          {isSignUp && (
                            <li className="form-item">
                              <label className="form-label">
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                required
                                className="form-input"
                              />
                            </li>
                          )}
                          {!isSignUp && !isForgotPassword && (
                            <li>
                              <button
                                type="button"
                                className="link"
                                onClick={() => {
                                  setIsForgotPassword(true);
                                  setIsSignUp(false); // Reset sign up state
                                }}
                              >
                                Forgot Your Password
                              </button>
                            </li>
                          )}
                          <li>
                            <button type="submit" className="btn-login">
                              {isSignUp ? "Sign Up" : "Login"}
                            </button>
                          </li>
                        </ul>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSignUp((prev) => !prev);
                setIsForgotPassword(false); // Reset forgot password state
              }}
              className="toggle-auth-mode"
            >
              {isSignUp
                ? "Already have an account?Login"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPopup;
