// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import ikon hapus

function ProductCard({ product, isAdmin, onDelete }) { // Terima prop isAdmin dan onDelete
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 relative border border-amber-100 flex flex-col"> {/* Tetap flex-col pada kartu utama */}
      <img
        src={product.imageUrl || 'https://via.placeholder.com/300x200/FFECB3/8D6E63?text=Sanggul'}
        alt={product.name}
        className="w-full h-48 object-cover object-center"
      />
      {/* Kontainer konten utama, sekarang lebih fleksibel */}
      <div className="p-4 flex flex-col flex-grow"> {/* Hapus justify-between dari sini */}
        <h3 className="text-xl font-semibold mb-2 text-amber-900 font-serif leading-tight"> {/* Tambahkan leading-tight untuk multi-baris nama */}
          {product.name}
        </h3>
        
        {/* Kontainer untuk harga dan tombol, didorong ke bawah */}
        <div className="mt-auto pt-2"> {/* mt-auto untuk dorong ke bawah, pt-2 untuk sedikit padding atas */}
          <p className="text-amber-700 mb-3 font-bold text-lg"> {/* Warna & font harga, mb-3 tetap agar tidak terlalu mepet */}
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

      {/* Tombol Hapus - Hanya tampil jika isAdmin true */}
      {isAdmin && (
        <button
          onClick={() => onDelete(product.id, product.name)} // Panggil onDelete dengan ID dan nama produk
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition duration-300 z-10"
          aria-label={`Hapus ${product.name}`}
        >
          <FaTrash size={16} />
        </button>
      )}
    </div>
  );
}

export default ProductCard;