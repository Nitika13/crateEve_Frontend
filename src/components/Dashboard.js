import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const topProducts = [...products]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  const totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);
  const mostStocked = products.reduce((max, p) => p.quantity > max.quantity ? p : max, products[0] || {});
  const leastStocked = products.reduce((min, p) => p.quantity < min.quantity ? p : min, products[0] || {});

  return (
    <div className="dashboard-container pastel-background">
      {/* <h2 className="dashboard-title">📊 KawaiiStore Analytics</h2> */}

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card stat-card bg-pink text-center">
            <div className="card-body">
              <h5>Total Products</h5>
              <p className="stat-number">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card bg-purple text-center">
            <div className="card-body">
              <h5>Total Quantity</h5>
              <p className="stat-number">{totalQuantity}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card bg-peach text-center">
            <div className="card-body">
              <h5>Most Stocked</h5>
              <p className="stat-number">{mostStocked?.name || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card bg-mint text-center">
            <div className="card-body">
              <h5>Least Stocked</h5>
              <p className="stat-number">{leastStocked?.name || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* <h4 className="text-center mb-3">📦 Product Quantity Overview</h4> */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topProducts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="quantity" fill="#d9c2f0" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="text-center mt-4">
        <button className="btn btn-pastel" onClick={() => navigate("/products")}>
          View all products
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
