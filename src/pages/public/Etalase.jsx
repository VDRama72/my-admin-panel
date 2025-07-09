// src/pages/public/Etalase.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import FoodCard from '../../components/public/FoodCard';
import api from '../../services/api';

export default function Etalase() {
  useTitle('Etalase • D’PoIN');
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const res = await api.get('/products');
      setProducts(res.data);
    }
    load();
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-700">D’PoIN Etalase</h1>
          <Link
            to="/login"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm md:text-base"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-8 md:py-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Selamat Datang di D’PoIN</h2>
        <p className="text-base md:text-lg max-w-xl mx-auto">
          Solusi pelayanan online warga Dompu – cepat, mudah, dan terpercaya!
        </p>
      </section>

      {/* Layanan Utama */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-5 rounded shadow hover:shadow-lg transition">
            <img src="/car-icon.png" alt="Car" className="mx-auto mb-4 w-12 h-12 md:w-16 md:h-16" />
            <h3 className="text-lg md:text-xl font-semibold mb-1">D’PoIN Car</h3>
            <p className="text-gray-600 mb-3 text-sm">Transportasi praktis untuk kebutuhan harian Anda.</p>
            <Link to="/dpoi-car" className="text-indigo-600 font-semibold hover:underline text-sm">
              Lihat Layanan →
            </Link>
          </div>
          <div className="bg-white p-5 rounded shadow hover:shadow-lg transition">
            <img src="/store-icon.png" alt="Store" className="mx-auto mb-4 w-12 h-12 md:w-16 md:h-16" />
            <h3 className="text-lg md:text-xl font-semibold mb-1">D’PoIN Store</h3>
            <p className="text-gray-600 mb-3 text-sm">Belanja produk lokal dengan mudah dan cepat.</p>
            <Link to="/dpoi-store" className="text-indigo-600 font-semibold hover:underline text-sm">
              Lihat Toko →
            </Link>
          </div>
          <div className="bg-white p-5 rounded shadow hover:shadow-lg transition">
            <img src="/food-icon.png" alt="Food" className="mx-auto mb-4 w-12 h-12 md:w-16 md:h-16" />
            <h3 className="text-lg md:text-xl font-semibold mb-1">D’PoIN Food</h3>
            <p className="text-gray-600 mb-3 text-sm">Pesan makanan favorit Anda langsung dari rumah.</p>
            <Link to="/dpoi-food" className="text-indigo-600 font-semibold hover:underline text-sm">
              Lihat Menu →
            </Link>
          </div>
        </div>
      </section>

      {/* Produk (Etalase) */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded px-4 py-2 shadow-sm w-full"
          />
          <Link
            to="/seller/signup"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition w-full sm:w-auto text-center text-sm"
          >
            Daftar Penjual
          </Link>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Maaf, produk tidak ditemukan.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-center">
            {filtered.map(prod => (
              <FoodCard
                key={prod._id}
                food={prod}
                onAddToCart={() => {}}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-6 border-t text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} D’PoIN. All rights reserved.
      </footer>
    </div>
  );
}
