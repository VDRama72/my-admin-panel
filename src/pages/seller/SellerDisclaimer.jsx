// ✅ FILE: src/pages/seller/SellerDisclaimer.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellerDisclaimer() {
  const navigate = useNavigate();

  const handleAgree = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    window.dispatchEvent(new Event('storage')); // sinkronisasi ulang ke App.jsx
    navigate('/seller');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-xl bg-white shadow-lg rounded p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">📢 Disclaimer</h1>
        <p className="text-sm text-gray-700 mb-4">
          Dengan menggunakan fitur penjual di platform ini, Anda menyetujui bahwa setiap transaksi akan dikenai komisi sebesar <strong>10%</strong> dari total penjualan. Komisi ini akan digunakan untuk biaya pengelolaan dan pengembangan platform.
        </p>
        <p className="text-sm text-gray-700 mb-6">
          Harap memastikan bahwa semua informasi produk yang Anda unggah adalah benar dan tidak melanggar ketentuan hukum atau kebijakan platform.
        </p>
        <button
          onClick={handleAgree}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Saya Setuju dan Lanjutkan
        </button>
      </div>
    </div>
  );
}
