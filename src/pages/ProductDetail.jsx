// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { FaShoppingCart, FaWhatsapp } from 'react-icons/fa'; // Import ikon

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Produk tidak ditemukan.");
        }
      } catch (err) {
        console.error("Error fetching product: ", err);
        setError("Gagal memuat detail produk. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-lg text-amber-600 py-8">Memuat detail produk...</p>;
  if (error) return <p className="text-center text-lg text-red-600 py-8">{error}</p>;
  if (!product) return <p className="text-center text-xl text-amber-700 py-8">Produk tidak tersedia.</p>;

  return (
    // Latar belakang div utama tidak berubah, tetap putih atau sesuai default parentnya
    <div className="py-12 px-4 sm:px-6 lg:px-8"> 
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-8 lg:gap-12 border border-amber-100">
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/600x450/FFECB3/8D6E63?text=Gambar+Produk'}
            alt={product.name}
            className="w-full max-h-96 object-cover object-center rounded-lg shadow-lg border border-amber-200"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4 font-serif leading-tight">
            {product.name}
          </h2>
            <p className="text-base lg:text-xl text-amber-700 font-semibold mb-6">
            Harga: Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}
          </p>
          <p className="text-amber-800 text-lg leading-relaxed mb-8">
            {product.description || 'Tidak ada deskripsi rinci untuk produk ini.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Tombol Tambahkan ke Keranjang */}
            <button
              className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:from-amber-700 hover:to-yellow-700 transition duration-300 transform hover:scale-105 flex items-center justify-center"
              onClick={() => alert('Fitur Keranjang Belanja akan segera hadir!')} // Placeholder
            >
              <FaShoppingCart className="mr-3" /> Tambahkan ke Keranjang
            </button>
            {/* Tombol Pesan via WhatsApp */}
            <a
              href={`https://wa.me/6289606623506?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}.%20Bisakah%20Anda%20memberikan%20informasi%20lebih%20lanjut%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <FaWhatsapp className="mr-3" /> Pesan via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;