// ✅ FILE: src/pages/seller/SellerDashboard.jsx

import React, { useEffect, useState } from 'react';
import useTitle from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import api from '../../services/api'; // axios instance

export default function SellerDashboard() {
  useTitle('Dashboard Penjual - D’PoIN');

  const userName = localStorage.getItem('userName') || 'Penjual';

  const [totalProduk, setTotalProduk] = useState(0);
  const [pesananHariIni, setPesananHariIni] = useState(0);
  const [pendapatanBulanIni, setPendapatanBulanIni] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProduk = await api.get('/seller/products/count');
        const resPesanan = await api.get('/seller/orders/today');
        const resPendapatan = await api.get('/seller/earnings/monthly');

        setTotalProduk(resProduk.data.count || 0);
        setPesananHariIni(resPesanan.data.count || 0);
        setPendapatanBulanIni(resPendapatan.data.total || 0);
      } catch (err) {
        console.error('❌ Gagal mengambil data dashboard seller:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Selamat Datang, {userName}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Produk</h2>
          <p className="text-3xl text-green-600 font-bold">{totalProduk}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Pesanan Hari Ini</h2>
          <p className="text-3xl text-indigo-600 font-bold">{pesananHariIni}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Pendapatan Bulan Ini</h2>
          <p className="text-3xl text-yellow-600 font-bold">Rp {pendapatanBulanIni.toLocaleString()}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow col-span-1">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🛍️ Manajemen Produk</h2>
          <p className="text-sm text-gray-600 mb-4">Kelola produk Anda, tambahkan atau edit produk yang tersedia.</p>
          <Link
            to="/seller/products"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            ➕ Kelola Produk
          </Link>
        </div>
      </div>
    </div>
  );
}
