import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css"; 

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:8080/api/auth/login", credentials);
  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("role", res.data.role);
  //     localStorage.setItem("username", credentials.username);
  //     toast.success("Login successful ");
  //     setTimeout(() => navigate("/products"), 1000);
  //   } catch {
  //     toast.error("Login failed ");
  //   }
  // };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://crateeve-backend-1.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Save the token to localStorage
      localStorage.setItem("token", data.token);

      // ✅ Optionally redirect or show success
      alert("Login successful!");
      // navigate("/dashboard"); // if using React Router

    } else {
      alert("Login failed: " + data.message);
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong");
  }
};


  return (
    <div className="login-container">
    <div className="login-wrapper">
      <div className="login-box shadow pastel-bg">
        <h2>ʚଓ Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="mt-3">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;
