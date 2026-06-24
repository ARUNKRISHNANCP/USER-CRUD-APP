// src/components/CreateUser.js
import React, { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", form);
      navigate("/");
    } catch (error) {
      console.error("Failed to create user:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      {["name", "phone", "email", "location"].map((field) => (
        <div key={field} className="mb-2">
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      ))}
      <button className="btn btn-primary">Add User</button>
    </form>
  );
}

export default CreateUser;
