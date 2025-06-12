// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center py-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-xl">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Sanggul Mbakyu</span>
      </h1>
      <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
        Temukan koleksi sanggul kualitas premium yang memancarkan keanggunan dan pesona, cocok untuk setiap momen spesial Anda.
      </p>
      <div className="flex justify-center space-x-6">
        <Link
          to="/products"
          className="bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-purple-700 transform hover:scale-105 transition duration-300"
        >
          Lihat Produk Kami
        </Link>
        <Link
          to="/contact"
          className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-purple-50 transition duration-300"
        >
          Hubungi Kami
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Kualitas Terbaik</h3>
          <p className="text-gray-600">Setiap sanggul dibuat dengan material pilihan dan detail yang sempurna.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Desain Elegan</h3>
          <p className="text-gray-600">Tersedia berbagai desain modern dan tradisional untuk gaya Anda.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Harga Terjangkau</h3>
          <p className="text-gray-600">Dapatkan keindahan tanpa menguras kantong Anda.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;