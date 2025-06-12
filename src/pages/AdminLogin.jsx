// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, redirect to add product page or admin dashboard
      navigate('/admin/add-product');
    } catch (err) {
      console.error("Login error:", err.message);
      let errorMessage = "Terjadi kesalahan saat login. Mohon coba lagi.";
      if (err.code === 'auth/invalid-email') {
        errorMessage = "Email tidak valid.";
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = "Akun dinonaktifkan.";
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = "Email atau password salah.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-16 px-4 sm:px-6 lg:px-8"> 
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-amber-100"> 
        <h2 className="text-3xl font-bold text-center text-amber-900 font-serif mb-8">Login Admin</h2> 
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-amber-700 text-lg font-medium mb-2">Email:</label> 
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200" // Warna focus & border
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-amber-700 text-lg font-medium mb-2">Password:</label> 
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200" // Warna focus & border
            />
          </div>
          {error && <p className="text-red-600 text-center">{error}</p>} 
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-3 px-6 rounded-md text-lg font-semibold shadow-lg hover:from-amber-700 hover:to-yellow-700 transition duration-300 flex items-center justify-center transform hover:scale-105" // Gradien & transform
            disabled={loading}
          >
            <FaSignInAlt className="mr-2" /> {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;