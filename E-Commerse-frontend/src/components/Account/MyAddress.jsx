import React, { useState, useEffect } from "react";
import axios from "axios";

const MyAddress = () => {
  const [address, setAddress] = useState({
    name: "",
    email: "",
    street: "",
    area: "",
    country: "",
    city: "",
    postalCode: "",
    state: "",
    mobile: "",
  });

  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/address"
        );
        setAddress({
          name: response.data.name || "",
          email: response.data.email || "",
          street: response.data.street || "",
          area: response.data.area || "",
          country: response.data.country || "",
          city: response.data.city || "",
          postalCode: response.data.postalCode || "",
          state: response.data.state || "",
          mobile: response.data.mobile || "",
        });
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/user/address", address);
      alert("Address saved successfully!");
      setIsEditing(false); // Switch to non-editing mode after saving
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Switch to editing mode when clicking the "Edit" button
  };

  return (
    <div className="shipping-adres">
      <div className="form-wrap">
        <div className="step-title">
          <h6>1. Shipping Address</h6>
          {!isEditing && (
            <a href="#" className="edit-btn" onClick={handleEdit}>
              Edit
            </a>
          )}
        </div>
        <ul className="form-list">
          <li>
            <label>Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={address.name}
              onChange={handleChange}
              disabled={!isEditing} // Disable input when not editing
            />
          </li>
          <li>
            <label>Email*</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={address.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </li>
          <li>
            <label>Street Address*</label>
            <input
              type="text"
              name="street"
              placeholder="House No/Street"
              value={address.street}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <input
              type="text"
              name="area"
              placeholder="Area / Landmark"
              value={address.area}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </li>
          <li className="half">
            <label>Country*</label>
            <input
              type="text"
              name="country"
              placeholder="Enter Your Country"
              value={address.country}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </li>
          <li className="half">
            <label>City*</label>
            <input
              type="text"
              name="city"
              placeholder="Enter Your City"
              value={address.city}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </li>
          <li className="half">
            <label>ZIP/Postal Code*</label>
            <input
              type="text"
              name="postalCode"
              placeholder="Eg:- 422010"
              value={address.postalCode}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </li>
          <li className="half">
            <label>State*</label>
            <input
              type="text"
              name="state"
              placeholder="Enter Your State"
              value={address.state}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </li>
          <li>
            <label>Mobile No*</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter Your Mobile No"
              value={address.mobile}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </li>
          {isEditing && (
            <li>
              <button type="submit" className="btn" onClick={handleSave}>
                SAVE
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyAddress;
