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
    <div className="py-8">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Hubungi Kami</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Kirimkan Pesan Anda</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">Nama:</label>
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
              <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 text-lg font-medium mb-2">Pesan:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-purple-700 transition duration-300 flex items-center justify-center"
              disabled={status === 'sending'}
            >
              <FaPaperPlane className="mr-2" /> {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
            {status === 'success' && <p className="text-green-600 mt-4 text-center">Pesan berhasil dikirim!</p>}
            {status === 'error' && <p className="text-red-600 mt-4 text-center">Gagal mengirim pesan. Silakan coba lagi.</p>}
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Informasi Kontak</h3>
          <div className="space-y-4 text-gray-700 text-lg">
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-3 text-purple-600" />
              Jl. Merdeka No. 123, Semarang, Jawa Tengah, Indonesia
            </p>
            <p className="flex items-center">
              <FaEnvelope className="mr-3 text-purple-600" />
              info@sanggulmbakyu.com
            </p>
            <p className="flex items-center">
              <FaPhone className="mr-3 text-purple-600" />
              +62 812-3456-7890
            </p>
          </div>
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Jam Operasional</h4>
            <ul className="list-disc list-inside text-gray-700 text-lg">
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