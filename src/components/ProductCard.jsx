// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import ikon hapus

function ProductCard({ product, isAdmin, onDelete }) { // Terima prop isAdmin dan onDelete
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 relative"> {/* Tambahkan relative untuk positioning tombol */}
      <img
        src={product.imageUrl || 'https://via.placeholder.com/300'}
        alt={product.name}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mb-3">
          Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}
        </p>
        <Link
          to={`/products/${product.id}`}
          className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Lihat Detail
        </Link>
      </div>

      {/* Tombol Hapus - Hanya tampil jika isAdmin true */}
      {isAdmin && (
        <button
          onClick={() => onDelete(product.id, product.name)} // Panggil onDelete dengan ID dan nama produk
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition duration-300"
          aria-label={`Hapus ${product.name}`}
        >
          <FaTrash size={16} />
        </button>
      )}
    </div>
  );
}

export default ProductCard;