// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">Sanggul Mbakyu</h3>
          <p className="text-gray-400">Menyediakan sanggul berkualitas dan elegan.</p>
        </div>
        <div className="mb-4 md:mb-0 text-center">
          <h4 className="text-lg font-semibold mb-2">Ikuti Kami</h4>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 transition duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-500 transition duration-300">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
        <div className="text-center md:text-right">
          <h4 className="text-lg font-semibold mb-2">Kontak</h4>
          <p className="text-gray-400">Email: info@sanggulmbakyu.com</p>
          <p className="text-gray-400">Telepon: +62 812-3456-7890</p>
        </div>
      </div>
      <div className="mt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Sanggul Mbakyu. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;