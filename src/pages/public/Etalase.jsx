﻿// ✅ FILE: src/pages/public/Etalase.jsx (Revisi TERAKHIR - Dengan Perbaikan search)

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios'; 
import useTitle from '../../hooks/useTitle'; 
import { FaStore } from 'react-icons/fa'; 
import FoodCard from '../../components/public/FoodCard'; // Pastikan FoodCard diimport jika digunakan

const api = axios.create({
  baseURL: 'http://localhost:4000/api', 
});

export default function Etalase() {
  useTitle('Etalase • D’PoIN'); 
  const { storeIdentifier } = useParams(); 
  const navigate = useNavigate(); 
  
  const [products, setProducts] = useState([]);
  // ✅ PASTIKAN BARIS INI ADA DAN DI SINI:
  const [search, setSearch] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUnfinishedOrderId, setLastUnfinishedOrderId] = useState(null);
  const [lastUnfinishedOrderStatus, setLastUnfinishedOrderStatus] = useState(null);
  const [checkingLastOrder, setCheckingLastOrder] = useState(true); 

  // --- Efek untuk memeriksa dan memuat produk ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = '/products';
        if (storeIdentifier) {
          url = `/products?storeName=${encodeURIComponent(storeIdentifier)}`; 
        }
        const res = await api.get(url);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Etalase: Gagal mengambil produk:", err);
        setError("Gagal memuat produk. Coba lagi.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, [storeIdentifier]); 

  // --- Efek untuk memeriksa order publik terakhir yang belum selesai ---
  useEffect(() => {
    const checkLastPublicOrder = async () => {
      const storedOrderId = localStorage.getItem('dpoi_last_public_order_id');
      const storedOrderPhone = localStorage.getItem('dpoi_last_public_order_phone'); 

      if (storedOrderId) {
        try {
          const res = await api.get(`/orders/${storedOrderId}`);
          const orderData = res.data.order || res.data; 

          const finalStatuses = ['completed', 'cancelled', 'returned']; 

          if (orderData && !finalStatuses.includes(orderData.status)) {
            setLastUnfinishedOrderId(storedOrderId);
            setLastUnfinishedOrderStatus(orderData.status);
          } else {
            localStorage.removeItem('dpoi_last_public_order_id');
            localStorage.removeItem('dpoi_last_public_order_phone');
            console.log("Etalase: Last public order reached final status, cleared from localStorage.");
          }
        } catch (err) {
          console.error("Etalase: Gagal memeriksa status order terakhir:", err.response?.data || err.message);
          if (err.response && err.response.status === 404) {
            localStorage.removeItem('dpoi_last_public_order_id');
            localStorage.removeItem('dpoi_last_public_order_phone');
          }
          setError("Gagal memuat status pesanan terakhir."); 
        } finally {
          setCheckingLastOrder(false); 
        }
      } else {
        setCheckingLastOrder(false); 
      }
    };

    checkLastPublicOrder();
  }, []); 

  // ✅ PASTIKAN filtered MENGGUNAKAN STATE search yang dideklarasikan
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Perbarui kondisi loading/error untuk mencakup checkingLastOrder
  if (loading || checkingLastOrder) {
    return <div className="p-4 text-gray-600">Memuat {storeIdentifier ? 'produk toko' : 'etalase'}...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold text-indigo-700">D’PoIN Etalase</h1>
          <Link
            to="/login"
            className="px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white text-center py-6 px-4">
        <h2 className="text-xl font-bold mb-1">Selamat Datang di D’PoIN</h2>
        <p className="text-sm max-w-md mx-auto">
          Solusi pelayanan online warga Dompu – cepat, mudah, dan terpercaya!
        </p>
      </section>

      {/* Layanan Utama */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Layanan Utama</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <Link to="/dpoi-car" className="flex flex-col items-center p-3 bg-white rounded-xl shadow hover:shadow-md transition">
            <img src="/car-icon.png" alt="Car" className="w-10 h-10 mb-2" />
            <span className="text-xs font-semibold text-gray-700">D’PoIN Car</span>
          </Link>
          <Link to="/dpoi-store" className="flex flex-col items-center p-3 bg-white rounded-xl shadow hover:shadow-md transition">
            <img src="/store-icon.png" alt="Store" className="w-10 h-10 mb-2" />
            <span className="text-xs font-semibold text-gray-700">D’PoIN Store</span>
          </Link>
          <Link to="/dpoi-food" className="flex flex-col items-center p-3 bg-white rounded-xl shadow hover:shadow-md transition">
            <img src="/food-icon.png" alt="Food" className="w-10 h-10 mb-2" />
            <span className="text-xs font-semibold text-gray-700">D’PoIN Food</span>
          </Link>
        </div>
      </section>

      {/* BANNER / TOMBOL LANJUTKAN PESANAN ANDA */}
      {lastUnfinishedOrderId && (
        <div className="max-w-6xl mx-auto px-4 mb-6"> 
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold text-sm sm:text-base">
                Anda memiliki pesanan terakhir yang belum selesai! (Status: {lastUnfinishedOrderStatus || 'Menunggu'})
                </p>
            </div>
            <button
                onClick={() => navigate(`/order-success/${lastUnfinishedOrderId}`)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base w-full sm:w-auto"
            >
                Lanjutkan Pesanan
            </button>
            </div>
        </div>
      )}

      {/* Produk */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="mb-4 flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="🔍 Cari produk, makanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Maaf, produk tidak ditemukan.</p>
        ) : (
          <div className="flex space-x-3 overflow-x-auto pb-2 -mx-1 px-1">
            {filtered.map(prod => (
              <div key={prod._id} className="flex-shrink-0">
                <FoodCard food={prod} onAddToCart={() => {}} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Ajakan Bergabung */}
      <section className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-base font-bold text-gray-700 mb-2">Ingin Bergabung?</h2>
          <p className="text-sm text-gray-500 mb-4">Daftarkan dirimu sebagai Penjual di D’PoIN</p>
          <Link
            to="/seller/disclaimer"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            🛍️ Daftar Penjual
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-4 border-t text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} D’PoIN. All rights reserved.
      </footer>
    </div>
  );
}