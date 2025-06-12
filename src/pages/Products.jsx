// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Import deleteDoc dan doc
import { db } from '../firebase-config';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaPlusCircle } from 'react-icons/fa';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const [user] = useAuthState(auth); // Cek status login admin
  const isAdmin = user && user.email === 'admin@sanggulmbakyu.com'; // Sesuaikan email admin Anda

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (err) {
        console.error("Error fetching products: ", err);
        setError("Gagal memuat produk. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId, productName) => {
    // Konfirmasi sebelum menghapus
    if (window.confirm(`Anda yakin ingin menghapus produk "${productName}"?`)) {
      try {
        await deleteDoc(doc(db, "products", productId));
        // Perbarui state produk setelah penghapusan
        setProducts(products.filter(product => product.id !== productId));
        alert(`Produk "${productName}" berhasil dihapus.`);

        // --- Catatan: Untuk penghapusan gambar di Cloudinary ---
        // Menghapus gambar dari Cloudinary secara aman memerlukan Cloud Functions.
        // Jika tidak, gambar akan tetap ada di Cloudinary dan perlu dihapus manual.
        // Bagian ini akan dijelaskan di bawah.
        // Anda akan memerlukan public_id gambar untuk menghapusnya dari Cloudinary.
        // Misalnya: const publicId = getPublicIdFromCloudinaryUrl(imageUrl);
        // Kemudian panggil Cloud Function untuk menghapus gambar.

      } catch (err) {
        console.error("Error deleting product: ", err);
        alert(`Gagal menghapus produk "${productName}": ${err.message}`);
      }
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-600 py-8">Memuat produk...</p>;
  if (error) return <p className="text-center text-lg text-red-500 py-8">{error}</p>;

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Koleksi Produk</h2>
        {user && isAdmin && ( // Tampilkan tombol hanya jika user sudah login DAN user adalah admin
          <Link
            to="/admin/add-product"
            className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            <FaPlusCircle className="mr-2" size={20} /> Tambah Produk Baru
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-center text-xl text-gray-700">Belum ada produk yang tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={isAdmin} // Teruskan prop isAdmin ke ProductCard
              onDelete={handleDeleteProduct} // Teruskan fungsi handleDeleteProduct
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;