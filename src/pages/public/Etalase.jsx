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
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg md:text-xl font-bold text-indigo-700">D’PoIN Etalase</h1>
          <Link
            to="/login"
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            Login
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-6 px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-2">Selamat Datang di D’PoIN</h2>
        <p className="text-sm md:text-base max-w-xl mx-auto">
          Solusi pelayanan online warga Dompu – cepat, mudah, dan terpercaya!
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4 flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded px-3 py-2 shadow-sm w-full"
          />
          <Link
            to="/seller/signup"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto text-sm text-center"
          >
            Daftar Penjual
          </Link>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Maaf, produk tidak ditemukan.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filtered.map(prod => (
              <FoodCard
                key={prod._id}
                food={{
                  _id: prod._id,
                  name: prod.name,
                  price: prod.price,
                  image: prod.image,
                  description: prod.description || ''
                }}
                onAddToCart={() => {}}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="bg-white text-center py-5 text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} D’PoIN. All rights reserved.
      </footer>
    </div>
  );
}
