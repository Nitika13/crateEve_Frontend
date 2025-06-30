import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css"; // 👈 custom pastel style

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "USER"
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/api/products");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", user);
      toast.success("Registration successful ");
      setTimeout(() => navigate("/login"), 1000);
    } catch {
      toast.error("Registration failed ");
    }
  };

  return (
    <div className="register-container">
    <div className="register-wrapper">
      <div className="register-box shadow pastel-bg">
        <h2>ʚଓ Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p className="mt-3">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Register;
