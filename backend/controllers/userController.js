// controllers/authController.js
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");

const jwt_secret = process.env.JWT_SECRET;

// Helper function to generate a token
const generateToken = (userId) => {
  return jwt.sign({ userId }, jwt_secret, { expiresIn: "1h" });
};

//---------------------------
//   Get user details by id
//---------------------------

exports.getUserDetailsById = async (req, res) => {
  const { userId } = req.body; // Getting the userId from the request body
  try {
    // Check if userId is provided in the body
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Respond with user data (without the password)
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error fetching user details",
    });
  }
};

//---------------------------------
// Update user details by user Id
//----------------------------------

const mongoose = require("mongoose");

exports.updateUserDetailsById = async (req, res) => {
  const { formData, userId } = req.body; // Destructure formData and userId from req.body

  try {
    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Valid User ID is required",
      });
    }

    console.log("Updating user with ID:", userId);
    console.log("New user details:", formData);

    // Find the user by ID and update details
    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        dateOfBirth: new Date(formData.dateOfBirth), // Convert to Date object if necessary
        mobileNo: formData.mobileNo,
      },
      { new: true, runValidators: true } // Ensures updated document is returned and validation is run
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Respond with updated user data
    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user,
    });
  } catch (err) {
    console.error("Error updating user details:", err);
    res.status(500).json({
      success: false,
      message: "Error updating user details",
    });
  }
};

// --------------------
//  Sign Up
// --------------------

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth, mobileNo } =
    req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({
      firstName,
      lastName,
      email,
      dateOfBirth,
      mobileNo,
      password: hashedPassword,
    });
    await user.save();

    // Generate token for the new user
    const token = generateToken(user._id);

    // Respond with token and user data (excluding password)
    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error signing up" });
  }
};

// --------------------
//  Sign In
// --------------------

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare provided password with stored password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate token if authentication is successful
    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Error signing in" });
  }
};

// ---------------------
//  Forgot Password
// ---------------------

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Reset your password: ${resetUrl}`
    );

    res.json({
      success: true,
      message: "Password reset link sent to email",
    });
  } catch (err) {
    console.error("Error sending email:", err); // Log error
    res.status(500).json({ message: "Error sending password reset email" });
  }
};

// ----------------------
//  Reset Password
// ----------------------

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
};
