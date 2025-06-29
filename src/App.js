import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Dashboard from './components/Dashboard';
import EditProduct from './components/EditProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/register"];
  const role = localStorage.getItem("role");

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Routes */}
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route
  path="/add-product"
  element={
    role !== "USER" ? (
      <ProductForm isEdit={false} />
    ) : (
      <Navigate to="/products" />
    )
  }
/>
<Route path="/edit-product/:id" element={<PrivateRoute><ProductForm isEdit={true} /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
}

function App() {
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
