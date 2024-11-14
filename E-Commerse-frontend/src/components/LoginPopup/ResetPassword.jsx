// ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useParams, useNavigate } from "react-router-dom"; // Import useParams for accessing URL parameters
import "./styles/ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming the new password
  const [error, setError] = useState(""); // State for error messages
  const [message, setMessage] = useState(""); // State for success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match!"); // Update error state
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/auth/reset-password/${token}`,
        {
          password,
        }
      );

      if (response.data.success) {
        setMessage("Password reset successful! You can now log in."); // Update success message
        setPassword(""); // Clear password field
        setConfirmPassword(""); // Clear confirm password field
        navigate("/");
      } else {
        setError(response.data.message); // Display error message from response
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again."); // Update error state
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message */}
      {message && <p className="success-message">{message}</p>}{" "}
      {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
