// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'; // Import dari firebase
import { useAuthState } from 'react-firebase-hooks/auth'; // Import dari react-firebase-hooks

function Navbar() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Gagal logout: " + error.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold font-serif tracking-wide">
          Sanggul Mbakyu
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-purple-200 text-lg transition duration-300">
              Beranda
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-white hover:text-purple-200 text-lg transition duration-300">
              Produk
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-purple-200 text-lg transition duration-300">
              Kontak
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/admin/add-product" className="text-white hover:text-purple-200 text-lg transition duration-300">
                  Tambah Produk
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-lg transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/admin-login" className="text-white hover:text-purple-200 text-lg transition duration-300">
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;