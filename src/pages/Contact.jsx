// src/pages/Contact.jsx
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // success, error, sending, ''

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        timestamp: new Date()
      });
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
      setStatus('error');
    }
  };

  return (
    // Latar belakang div utama tidak berubah, tetap putih atau sesuai default parentnya
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-900 font-serif mb-10">Hubungi Kami</h2>
      
      <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto mb-12 rounded-full"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-amber-100">
        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-semibold text-amber-800 mb-6 font-serif">Kirimkan Pesan Anda</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-amber-700 text-lg font-medium mb-2">Nama:</label>
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
              <label htmlFor="email" className="block text-amber-700 text-lg font-medium mb-2">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-amber-700 text-lg font-medium mb-2">Pesan:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                required
                className="w-full px-4 py-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-3 px-6 rounded-md text-lg font-semibold shadow-lg hover:from-amber-700 hover:to-yellow-700 transition duration-300 transform hover:scale-105 flex items-center justify-center"
              disabled={status === 'sending'}
            >
              <FaPaperPlane className="mr-2" /> {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
            {status === 'success' && <p className="text-green-600 mt-4 text-center">Pesan berhasil dikirim!</p>}
            {status === 'error' && <p className="text-red-600 mt-4 text-center">Gagal mengirim pesan. Silakan coba lagi.</p>}
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-amber-50 p-6 rounded-xl shadow-inner border border-amber-100">
          <h3 className="text-2xl font-semibold text-amber-800 mb-6 font-serif">Informasi Kontak</h3>
          <div className="space-y-4 text-amber-700 text-lg">
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-3 text-amber-600" />
              Jl. Merdeka No. 123, Semarang, Jawa Tengah, Indonesia
            </p>
            <p className="flex items-center">
              <FaEnvelope className="mr-3 text-amber-600" />
              info@sanggulmbakyu.com
            </p>
            <p className="flex items-center">
              <FaPhone className="mr-3 text-amber-600" />
              +62 812-3456-7890
            </p>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-amber-800 mb-4 font-serif">Jam Operasional</h4>
            <ul className="list-disc list-inside text-amber-700 text-lg">
              <li>Senin - Jumat: 09:00 - 17:00 WIB</li>
              <li>Sabtu: 09:00 - 14:00 WIB</li>
              <li>Minggu: Tutup</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;