// src/pages/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { FaSave } from 'react-icons/fa'; // Pastikan FaCloudUploadAlt SUDAH DIHAPUS

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(''); // State for category
  const [imageUrl, setImageUrl] = useState(''); // Existing image URL
  const [imageFile, setImageFile] = useState(null); // New image file for upload
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          setName(productData.name);
          setDescription(productData.description);
          setPrice(productData.price);
          // Set default category jika belum ada di data produk (untuk produk lama)
          setCategory(productData.category || 'sanggul'); 
          setImageUrl(productData.imageUrl);
        } else {
          setError("Produk tidak ditemukan.");
        }
      } catch (err) {
        console.error("Error fetching product for edit: ", err);
        setError("Gagal memuat detail produk untuk diedit.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setStatus('');
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      setStatus('Mengunggah gambar baru...');
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Cloudinary upload failed: ${errorData.error ? errorData.error.message : response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Gagal mengunggah gambar ke Cloudinary.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);
    let newImageUrl = imageUrl; // Start with existing image URL

    try {
      if (imageFile) {
        // If a new image file is selected, upload it
        newImageUrl = await uploadImageToCloudinary(imageFile);
      }

      setStatus('Memperbarui produk...');
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        name,
        description,
        price: parseFloat(price),
        category, // Update the category
        imageUrl: newImageUrl,
        updatedAt: new Date()
      });

      setStatus('success');
      alert('Produk berhasil diperbarui!');
      navigate('/products');
    } catch (error) {
      console.error("Error updating product:", error);
      setStatus('error');
      alert("Gagal memperbarui produk: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // DAFTAR KATEGORI BARU UNTUK EDIT PRODUK
  const categories = ['Sanggul', 'Aksesoris', 'Lain-lain'];

  if (loading) return <p className="text-center text-lg text-amber-600 py-8">Memuat detail produk untuk diedit...</p>;
  if (error) return <p className="text-center text-lg text-red-600 py-8">{error}</p>;
  if (!name) return <p className="text-center text-xl text-amber-700 py-8">Produk tidak ditemukan.</p>;

  return (
    <div className="flex justify-center items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl border border-amber-100">
        <h2 className="text-3xl font-bold text-center text-amber-900 font-serif mb-8">Edit Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-amber-700 text-lg font-medium mb-2">Nama Produk:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-amber-700 text-lg font-medium mb-2">Deskripsi:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-amber-700 text-lg font-medium mb-2">Harga (Rp):</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-amber-700 text-lg font-medium mb-2">Kategori:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 bg-white text-amber-800"
            >
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-amber-700 text-lg font-medium mb-2">Gambar Produk Saat Ini:</label>
            {imageUrl && (
              <img src={imageUrl} alt="Current Product" className="w-32 h-32 object-cover rounded-md mb-4 border border-amber-200" />
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-amber-700 bg-white border border-amber-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {imageFile && (
              <p className="mt-2 text-sm text-amber-600">File baru dipilih: {imageFile.name}</p>
            )}
          </div>
          {status && status !== 'success' && <p className={`text-center mt-4 ${status === 'error' ? 'text-red-600' : 'text-amber-600'}`}>{status}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-md text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 flex items-center justify-center transform hover:scale-105"
            disabled={loading}
          >
            <FaSave className="mr-2" />
            {loading ? (
              status.includes('Mengunggah') ? 'Mengunggah Gambar...' : 'Memperbarui Produk...'
            ) : (
              'Simpan Perubahan'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;