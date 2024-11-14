import React, { useState, useEffect } from "react";
import axios from "axios";

const MyDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    mobileNo: "",
    email: "",
  });

  const userId = localStorage.getItem("id");
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  // Fetch initial data when component loads
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/user/details",
          { userId }
        );

        if (response.data.success) {
          setFormData({
            firstName: response.data.user.firstName || "",
            lastName: response.data.user.lastName || "",
            dateOfBirth: response.data.user.dateOfBirth || "",
            mobileNo: response.data.user.mobileNo || "",
            email: response.data.user.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchDetails();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/auth/update/user/details",
        {
          formData,
          userId,
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        setIsEditing(false); // Disable edit mode after saving
      }
    } catch (error) {
      console.error("Error saving details:", error);
    }
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="step-title">
        <h6>Personal Information</h6>
        {!isEditing && (
          <a href="#" className="edit-btn" onClick={handleEditClick}>
            Edit
          </a>
        )}
      </div>
      <div className="personal-info">
        <div className="form-wrap">
          <ul className="form-list">
            <li className="half">
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing} // Disable input when not in edit mode
              />
            </li>
            <li className="half">
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </li>
            <li className="half">
              <label>Date of Birth*</label>
              <input
                type="text"
                name="dateOfBirth"
                placeholder="Enter date of birth"
                value={
                  formData.dateOfBirth ? formData.dateOfBirth.split("T")[0] : ""
                }
                onChange={handleChange}
                disabled={!isEditing}
              />
            </li>
            <li className="half">
              <label>Mobile No*</label>
              <input
                type="text"
                name="mobileNo"
                placeholder="Enter mobile number"
                value={formData.mobileNo}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="step-title">
        <h6>Email Address</h6>
      </div>
      <div className="personal-info">
        <div className="form-wrap">
          <ul className="form-list">
            <li>
              <label>Email ID*</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </li>
            {isEditing && (
              <li>
                <button type="submit" className="btn" onClick={handleSubmit}>
                  SAVE
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </form>
  );
};

export default MyDetails;
