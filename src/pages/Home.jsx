// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore"; // Import untuk fetching data Firebase
import { db } from '../firebase-config'; // Pastikan path ini benar
import ProductCard from '../components/ProductCard'; // Import ProductCard

function Home() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList.slice(0, 3)); // Ambil hanya 3 produk teratas untuk ditampilkan di Home
      } catch (err) {
        console.error("Error fetching products for Home: ", err);
        setErrorProducts("Gagal memuat produk unggulan.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section: Gradien lembut */}
      <section className="w-full text-center py-20 px-4 sm:px-6 lg:py-24 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-amber-900 mb-6 leading-tight font-serif">
            Selamat Datang di{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-600 block mt-2">
              Sanggul MbakYu
            </span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-lg md:text-xl text-amber-800 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Temukan koleksi sanggul tradisional berkualitas premium yang memancarkan keanggunan dan pesona 
            khas, cocok untuk setiap momen spesial dan upacara adat Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16">
            <Link
              to="/products"
              className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-lg md:text-xl font-semibold shadow-xl hover:from-amber-700 hover:to-yellow-700 transform hover:scale-105 transition duration-300"
            >
              Lihat Koleksi Kami
            </Link>
            <Link
              to="/contact"
              className="bg-white text-amber-700 border-2 border-amber-600 px-8 py-3 md:px-10 md:py-4 rounded-full text-lg md:text-xl font-semibold shadow-lg hover:bg-amber-50 hover:border-amber-700 transition duration-300"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      ---

      {/* Features Section: Solid background light */}
      <section className="w-full py-16 px-4 sm:px-6 lg:py-20 bg-amber-50 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-4 font-serif">
            Keunggulan Kami
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              iconPath="M5 13l4 4L19 7" 
              title="Kualitas Premium" 
              description="Setiap sanggul dibuat dengan material pilihan terbaik dan keahlian tangan yang telah teruji, memastikan kualitas yang tahan lama dan nyaman digunakan." 
            />
            <FeatureCard 
              iconPath="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" 
              title="Desain Tradisional" 
              description="Tersedia berbagai desain autentik yang mempertahankan kearifan budaya, cocok untuk upacara pernikahan, pertunjukan seni, dan acara adat lainnya." 
            />
            <FeatureCard 
              iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" 
              title="Harga Terjangkau" 
              description="Dapatkan keindahan dan kualitas terbaik dengan harga yang ramah di kantong, tanpa mengorbankan kualitas dan keautentikan produk kami." 
            />
          </div>
        </div>
      </section>

      ---

      {/* Product Gallery Section: Background pattern/texture or distinct color */}
      <section className="w-full py-16 px-4 sm:px-6 lg:py-20 bg-yellow-50 relative overflow-hidden">
        {/* Optional: Add a subtle background pattern for more distinct look */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 text-center mb-4 font-serif">
            Produk Unggulan Kami
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto mb-12 rounded-full"></div>
          
          {loadingProducts ? (
            <p className="text-center text-lg text-gray-600 py-8">Memuat produk unggulan...</p>
          ) : errorProducts ? (
            <p className="text-center text-lg text-red-500 py-8">{errorProducts}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-xl text-gray-700">Belum ada produk unggulan untuk ditampilkan.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  // Di halaman home, kita tidak perlu prop isAdmin dan onDelete
                  // karena ini hanya tampilan highlight, bukan untuk manajemen produk.
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:from-amber-700 hover:to-yellow-700 transform hover:scale-105 transition duration-300"
            >
              Lihat Semua Koleksi
            </Link>
          </div>
        </div>
      </section>

      ---

      {/* Call to Action Section: Darker, bold gradient */}
      <section className="w-full bg-gradient-to-r from-amber-800 to-yellow-800 py-16 px-4 sm:px-6 lg:py-20 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-100 mb-6 font-serif">
            Siap Tampil Menawan?
          </h2>
          <p className="text-lg md:text-xl text-amber-200 mb-8 leading-relaxed">
            Jangan lewatkan kesempatan untuk memiliki sanggul berkualitas premium. 
            Hubungi kami sekarang untuk konsultasi dan pemesanan.
          </p>
          <Link
            to="/contact"
            className="bg-white text-amber-800 px-8 py-3 md:px-10 md:py-4 rounded-full text-lg md:text-xl font-semibold shadow-xl hover:bg-amber-50 transform hover:scale-105 transition duration-300 inline-block"
          >
            Konsultasi Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}

// Komponen terpisah untuk kartu fitur agar kode lebih rapi dan reusable
const FeatureCard = ({ iconPath, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
    <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center mb-6 mx-auto">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-amber-900 mb-4 text-center font-serif">
      {title}
    </h3>
    <p className="text-amber-700 text-center leading-relaxed">
      {description}
    </p>
  </div>
);

export default Home;