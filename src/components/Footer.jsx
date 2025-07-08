// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-900 via-yellow-900 to-amber-800 text-amber-100 relative overflow-hidden">
      <div className="container mx-auto px-6 py-12 relative z-10"> {/* Tambahkan relative z-10 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Sanggul Mbakyu Logo" 
                className="h-12 w-12 object-contain rounded-full border-2 border-amber-200 shadow-md"
              />
              <div>
                <h3 className="text-2xl font-bold font-serif text-amber-100">Sanggul MbakYu</h3>
                <p className="text-amber-300 text-sm italic">Keanggunan Tradisional</p>
              </div>
            </div>
            <p className="text-amber-200 leading-relaxed mb-6 max-w-md">
              Menyediakan sanggul tradisional berkualitas premium dengan desain autentik yang 
              mempertahankan kearifan budaya untuk setiap momen spesial Anda.
            </p>
          </div>

          {/* Our Social Media (Mantan Quick Links) */}
          <div>
            <h4 className="text-xl font-bold mb-6 font-serif text-amber-100">Our Social Media</h4>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/sanggulmbakyu" // Contoh link Facebook
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-amber-700 hover:bg-blue-600 p-3 rounded-full transition duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://instagram.com/sanggulmbakyu" // Contoh link Instagram
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-amber-700 hover:bg-pink-600 p-3 rounded-full transition duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://wa.me/6289606623506" // Contoh link WhatsApp
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-amber-700 hover:bg-green-600 p-3 rounded-full transition duration-300 transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info (Dipertahankan di kolom terpisah) */}
          <div>
            <h4 className="text-xl font-bold mb-6 font-serif text-amber-100">Kontak Kami</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-amber-200 text-sm">
                    Jl. Merdeka  No. 123<br />
                    Demak, Jawa Tengah
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-amber-500 flex-shrink-0" />
                <p className="text-amber-200 text-sm">+62 896-0662-3506</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-amber-500 flex-shrink-0" />
                <p className="text-amber-200 text-sm">info@sanggulmbakyu.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Border */}
        <div className="border-t border-amber-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Sanggul MbakYu. Semua hak cipta dilindungi.
            </p>
            <div className="flex space-x-6 text-amber-300 text-sm">
              <a href="/privacy" className="hover:text-amber-100 transition duration-300">
                Kebijakan Privasi
              </a>
              <a href="/terms" className="hover:text-amber-100 transition duration-300">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Traditional Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FCD34D' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm-10 0c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
    </footer>
  );
}

export default Footer;