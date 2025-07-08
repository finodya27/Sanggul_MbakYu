import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaBars, FaTimes } from 'react-icons/fa'; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
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

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-900 shadow-lg border-b-2 border-amber-600">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo dan Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition duration-300">
            <img 
              src="/logo.png" 
              alt="Sanggul Mbakyu Logo" 
              className="h-12 w-12 object-contain rounded-full border-2 border-amber-200 shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-amber-100 text-2xl font-bold font-serif tracking-wide">
                Sanggul MbakYu
              </span>
              <span className="text-amber-200 text-xs font-light italic">
                Keanggunan Tradisional
              </span>
            </div>
          </Link>

          {/* Hamburger Menu untuk Mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-amber-100 focus:outline-none focus:text-amber-200"
              aria-label="Toggle navigation"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Navigation Menu (Desktop) */}
          <ul className="hidden md:flex items-center space-x-8"> 
            <li>
              <Link 
                to="/" 
                className="text-amber-100 hover:text-amber-200 text-lg font-medium transition duration-300 relative group"
              >
                Beranda
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className="text-amber-100 hover:text-amber-200 text-lg font-medium transition duration-300 relative group"
              >
                Produk
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-amber-100 hover:text-amber-200 text-lg font-medium transition duration-300 relative group"
              >
                Kontak
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            
            {user ? (
              <>
                <li>
                  <Link 
                    to="/admin/add-product" 
                    className="text-amber-100 hover:text-amber-200 text-lg font-medium transition duration-300 relative group"
                  >
                    Tambah Produk
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition duration-300 transform hover:scale-105"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/admin-login" 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition duration-300 transform hover:scale-105"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div 
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-amber-800 pb-4 transition-all duration-300 ease-in-out`}
      >
        <ul className="flex flex-col items-center space-y-4 pt-4">
          <li>
            <Link 
              to="/" 
              className="text-amber-100 hover:text-amber-200 text-lg font-medium transition duration-300 relative group block w-full text-center"
              onClick={closeMobileMenu}
            >
              Beranda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className="text-amber-100 hover:text-amber-200 text-lg font-medium transition duration-300 relative group block w-full text-center"
              onClick={closeMobileMenu}
            >
              Produk
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="text-amber-100 hover:text-amber-200 text-lg font-medium transition duration-300 relative group block w-full text-center"
              onClick={closeMobileMenu}
            >
              Kontak
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          
          {user ? (
            <>
              <li>
                <Link 
                  to="/admin/add-product" 
                  className="text-amber-100 hover:text-amber-200 text-lg font-medium transition duration-300 relative group block w-full text-center"
                  onClick={closeMobileMenu}
                >
                  Tambah Produk
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { handleLogout(); closeMobileMenu(); }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition duration-300 transform hover:scale-105 w-auto"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/admin-login" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition duration-300 transform hover:scale-105 w-auto"
                onClick={closeMobileMenu}
              >
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