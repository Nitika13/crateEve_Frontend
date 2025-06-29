import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import "./ProductForm.css";

function ProductForm({ isEdit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      api.get(`/products/${id}`)
        .then((res) => {
          setForm({
            name: res.data.name,
            description: res.data.description,
            price: res.data.price,
            quantity: res.data.quantity,
            imageUrl: res.data.imageUrl || ""
          });
        })
        .catch(() => toast.error("Failed to load product"));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
    };

    try {
      if (isEdit && id) {
        await api.put(`/products/${id}`, payload);
        toast.success("Product updated!");
      } else {
        await api.post("/products", payload);
        toast.success("Product added!");
      }
      setTimeout(() => navigate("/products"), 1000);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{isEdit ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />

        <button type="submit" className="btn-pastel">
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
