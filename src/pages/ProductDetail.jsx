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

  if (loading) return <p className="text-center text-lg text-gray-600 py-8">Memuat detail produk...</p>;
  if (error) return <p className="text-center text-lg text-red-500 py-8">{error}</p>;
  if (!product) return <p className="text-center text-xl text-gray-700 py-8">Produk tidak tersedia.</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/600'}
          alt={product.name}
          className="w-full h-96 object-cover object-center rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h2>
        <p className="text-3xl text-purple-700 font-semibold mb-6">
          Harga: Rp {product.price ? product.price.toLocaleString('id-ID') : 'N/A'}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          {product.description || 'Tidak ada deskripsi untuk produk ini.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            onClick={() => alert('Fitur Keranjang Belanja akan datang!')} // Placeholder
          >
            <FaShoppingCart className="mr-2" /> Tambahkan ke Keranjang
          </button>
          <a
            href={`https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}%20(${product.id}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
          >
            <FaWhatsapp className="mr-2" /> Pesan via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;