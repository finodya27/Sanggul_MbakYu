// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct'; // Import the new EditProduct component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            {/* Protected Routes for Admin */}
            <Route
              path="/admin/add-product"
              element={<ProtectedRoute element={<AddProduct />} />}
            />
            <Route
              path="/admin/edit-product/:id" // New protected route for editing products
              element={<ProtectedRoute element={<EditProduct />} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;