import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Add this line to apply pastel styles

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar pastel-navbar shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="navbar-brand" style={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}> <span className="butter-fly" style={{ color: "#d24c9d", fontWeight: "bold"}}>ʚଓ </span> crateEVE</span>


        <div className="d-flex align-items-center gap-3">
          <span className="pastel-role">Role: <b>{role}</b></span>
          {role !== "USER" && (
  <button
    className="btn btn-outline-light me-2"
    onClick={() => navigate("/add-product")}
  >
    + Add Product
  </button>
)}
          <button
            className="btn btn-outline-danger pastel-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
  className="btn btn-outline-danger pastel-btn"
  onClick={() => navigate("/dashboard")}
>
   Let's Analyze ☕︎
</button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
