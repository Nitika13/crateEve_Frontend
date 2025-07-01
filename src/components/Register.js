import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css"; // 👈 custom pastel style

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "USER",
    managerKey: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Build the registration URL based on the role
  let url = "/auth/register";

  if (user.role === "MANAGER") {
    if (!user.managerKey.trim()) {
      toast.error("Manager key is required!");
      return;
    }

    // Add the managerKey as query param
    url += `?managerKey=${encodeURIComponent(user.managerKey.trim())}`;
  }

  try {
    await api.post(url, user);
    toast.success("Registration successful");
    setTimeout(() => navigate("/login"), 1000);
  } catch {
    toast.error("Registration failed");
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

            {/* Show manager key input if selected role is MANAGER */}
            {/* {user.role === "MANAGER" && (
              <input
                type="text"
                name="managerKey"
                placeholder="Enter Manager Key"
                value={user.managerKey}
                onChange={handleChange}
                required
              />
            )} */}
            {user.role === "MANAGER" && (
  <input
    type="text"
    name="managerKey"
    placeholder="Manager Secret Key"
    value={user.managerKey}
    onChange={handleChange}
    required
  />
)}


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
