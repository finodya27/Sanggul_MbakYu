// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { FaPlusSquare, FaCloudUploadAlt } from 'react-icons/fa';

function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Ambil kredensial Cloudinary dari variabel lingkungan - KEMBALIKAN KE INI
  const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

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
      setStatus('Mengunggah gambar...');
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        // Tangkap pesan error dari Cloudinary jika ada
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
    let imageUrl = '';

    try {
      if (!imageFile) {
        throw new Error("Pilih file gambar untuk diunggah.");
      }

      imageUrl = await uploadImageToCloudinary(imageFile);

      setStatus('Menambahkan produk...');
      await addDoc(collection(db, "products"), {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        createdAt: new Date()
      });

      setStatus('success');
      alert('Produk berhasil ditambahkan!');
      setName('');
      setDescription('');
      setPrice('');
      setImageFile(null);
      navigate('/products');
    } catch (error) {
      console.error("Error adding product:", error);
      setStatus('error');
      alert("Gagal menambahkan produk: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-16">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Tambah Produk Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">Nama Produk:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-lg font-medium mb-2">Deskripsi:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 text-lg font-medium mb-2">Harga (Rp):</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 text-lg font-medium mb-2">Gambar Produk:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full text-gray-700 bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {imageFile && (
              <p className="mt-2 text-sm text-gray-600">File dipilih: {imageFile.name}</p>
            )}
          </div>
          {status && status !== 'success' && <p className={`text-center mt-4 ${status === 'error' ? 'text-red-500' : 'text-blue-500'}`}>{status}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-purple-700 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            <FaPlusSquare className="mr-2" />
            {loading ? (
              status.includes('Mengunggah') ? 'Mengunggah Gambar...' : 'Menambahkan Produk...'
            ) : (
              'Tambah Produk'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;