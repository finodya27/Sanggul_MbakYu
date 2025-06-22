// src/pages/Products.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore"; // Import query dan orderBy
import { db } from '../firebase-config';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaPlusCircle, FaSearch } from 'react-icons/fa';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const auth = getAuth();
  const [user] = useAuthState(auth);
  const isAdmin = user && user.email === 'admin@sanggulmbakyu.com';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Buat query dengan pengurutan berdasarkan 'createdAt' secara descending (terbaru dulu)
        const productsCollectionRef = collection(db, "products");
        const q = query(productsCollectionRef, orderBy("createdAt", "desc")); // Tambahkan orderBy

        const querySnapshot = await getDocs(q); // Gunakan query yang sudah diurutkan
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
    if (window.confirm(`Anda yakin ingin menghapus produk "${productName}"?`)) {
      try {
        await deleteDoc(doc(db, "products", productId));
        setProducts(products.filter(product => product.id !== productId));
        alert(`Produk "${productName}" berhasil dihapus.`);
      } catch (err) {
        console.error("Error deleting product: ", err);
        alert(`Gagal menghapus produk "${productName}": ${err.message}`);
      }
    }
  };

  const filteredAndSearchedProducts = useMemo(() => {
    let filtered = products;

    if (filterCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category && product.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [products, searchTerm, filterCategory]);

  const categories = ['All', 'Sanggul', 'Aksesoris', 'Lain-lain']; // Pastikan ini sudah benar

  if (loading) return <p className="text-center text-lg text-amber-600 py-8">Memuat produk...</p>;
  if (error) return <p className="text-center text-lg text-red-600 py-8">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-amber-900 font-serif mb-4 sm:mb-0">Koleksi Produk Kami</h2>
          {user && isAdmin && (
            <Link
              to="/admin/add-product"
              className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-700 hover:to-emerald-700 transition duration-300 transform hover:scale-105"
            >
              <FaPlusCircle className="mr-2" size={20} /> Tambah Produk Baru
            </Link>
          )}
        </div>

        <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto sm:mx-0 mb-12 rounded-full"></div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500" />
          </div>

          {/* Filter Dropdown */}
          <div className="w-full md:w-1/4">
            <select
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-800 bg-white"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredAndSearchedProducts.length === 0 ? (
          <p className="text-center text-xl text-amber-700 py-16">Tidak ada produk yang cocok dengan pencarian atau filter Anda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredAndSearchedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;