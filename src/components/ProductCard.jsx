// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import ikon hapus dan edit

function ProductCard({ product, isAdmin, onDelete }) { // Terima prop isAdmin dan onDelete
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 relative border border-amber-100 flex flex-col">
      <img
        src={product.imageUrl || 'https://via.placeholder.com/300x200/FFECB3/8D6E63?text=Sanggul'}
        alt={product.name}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-amber-900 font-serif leading-tight">
          {product.name}
        </h3>
        {product.category && ( // Display category if it exists
          <p className="text-sm text-amber-600 mb-2">Kategori: {product.category}</p>
        )}
        <div className="mt-auto pt-2">
          <p className="text-amber-700 mb-3 font-bold text-lg">
            Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}
          </p>
          <Link
            to={`/products/${product.id}`}
            className="block w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white text-center py-2 px-4 rounded-md hover:from-amber-700 hover:to-yellow-700 transition duration-300 shadow-md"
          >
            Lihat Detail
          </Link>
        </div>
      </div>

      {/* Tombol Aksi Admin */}
      {isAdmin && (
        <div className="absolute top-2 right-2 flex space-x-2"> {/* Container for admin buttons */}
          <Link
            to={`/admin/edit-product/${product.id}`} // Link to edit page
            className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 z-10"
            aria-label={`Edit ${product.name}`}
          >
            <FaEdit size={16} />
          </Link>
          <button
            onClick={() => onDelete(product.id, product.name)} // Panggil onDelete dengan ID dan nama produk
            className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition duration-300 z-10"
            aria-label={`Hapus ${product.name}`}
          >
            <FaTrash size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;