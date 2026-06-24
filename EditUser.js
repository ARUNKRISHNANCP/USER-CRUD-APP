// src/components/EditUser.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api";

function EditUser() {
  const { id } = useParams(); // gets the user ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: ""
  });

  // Load user data when the component mounts
  useEffect(() => {
    axios.get(`/users/${id}`)
      .then(res => {
        setForm(res.data);
      })
      .catch(err => {
        console.error("Error fetching user:", err.message);
      });
  }, [id]);

  // Update local form state when input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${id}`, form);
      navigate("/"); // redirect to user list
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      {["name", "phone", "email", "location"].map((field) => (
        <div className="mb-2" key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="text"
            name={field}
            className="form-control"
            value={form[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button className="btn btn-success">Update</button>
    </form>
  );
}

export default EditUser;
