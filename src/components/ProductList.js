import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../components/ProductList.css"; // pastel styles
import { toast } from "react-toastify";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const fetchProducts = useCallback(async (query = "") => {
    try {
      const res = await api.get(`/products${query ? `?name=${query}` : ""}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);

      // Only navigate if token is missing
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

//  const handleSearch = async (e) => {
//   e.preventDefault();

//   if (!search.trim()) return;

//   const token = localStorage.getItem("token"); // ✅ get JWT token from localStorage

//   try {
//     const aiRes = await fetch("http://localhost:5000/similar-products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         query: search,
//         token: token  // ✅ include token in request body
//       }),
//     });

//     const aiData = await aiRes.json();

//     if (Array.isArray(aiData.similar)) {
//       console.log("AI Data:", aiData); // ✅ Helpful debug
//       setProducts(aiData.similar);     // ✅ Display the AI result
//     } else {
//       toast.error("AI response was invalid.");
//     }

//   } catch (err) {
//     console.error("AI search failed:", err);
//     toast.error("AI search failed");
//   }
// };

const handleSearch = async (e) => {
  e.preventDefault();
  if (!search.trim()) return;
  fetchProducts(search);
};



  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/products/${id}`);
      if (res.status === 200 || res.status === 204) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container pastel-background mt-4">
      <form className="d-flex mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by product name"
          className="form-control me-2 pastel-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn pastel-button">Search</button>
      </form>

      {products.length === 0 ? (
        <p className="text-muted">No products found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((prod) => {
            const isManager = role === "MANAGER";
            const isAdmin = role === "ADMIN";
            const isOwner = prod.createdBy?.username === username;
            const canEditOrDelete = isManager || (isAdmin && isOwner);

            return (
              <div className="col fade-in" key={prod.id}>
                <div className="card product-card h-100">
                  {prod.imageUrl && (
                    <img
                      src={prod.imageUrl}
                      className="card-img-top"
                      alt={prod.name}
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        backgroundColor: "#fff0f5",
                        padding: "10px",
                        borderBottom: "1px solid #f8c8dc",
                      }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <p className="card-text" >{prod.description}</p>
                    <p><strong>Price:</strong> ₹{prod.price}</p>
                    <p><strong>Quantity:</strong> {prod.quantity}</p>
                  </div>
                  {canEditOrDelete && (
                    <div className="card-footer d-flex justify-content-between">
                      <button
                        className="btn btn-sm pastel-edit"
                        onClick={() => navigate(`/edit-product/${prod.id}`)}
                      >
                        🦋Edit
                      </button>
                      <button
                        className="btn btn-sm pastel-delete"
                        onClick={() => handleDelete(prod.id)}
                      >
                        🍂 Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductList;
