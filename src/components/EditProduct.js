import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(res.data);
      } catch (err) {
        console.error('Error loading product:', err);
        setMessage('Failed to load product');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(`/products/${id}`, product, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Product updated successfully!');
      setTimeout(() => navigate('/products'), 1000);
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('Failed to update product');
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate}>
        <input name="name" value={product.name} onChange={handleChange} placeholder="Name" required /><br />
        <input name="description" value={product.description} onChange={handleChange} placeholder="Description" required /><br />
        <input name="price" value={product.price} onChange={handleChange} placeholder="Price" type="number" required /><br />
        <input name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" type="number" required /><br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
