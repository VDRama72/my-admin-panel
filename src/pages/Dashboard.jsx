// src/pages/Dashboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import useTitle from '../hooks/useTitle';

export default function Dashboard() {
  useTitle('Dashboard - D’PoIN Admin Panel');

  if (!localStorage.getItem('token')) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Admin</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Driver</h2>
              <p className="text-3xl text-indigo-600">12</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">Total Penjual</h2>
              <p className="text-3xl text-indigo-600">8</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">Order Hari Ini</h2>
              <p className="text-3xl text-indigo-600">25</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">Pendapatan</h2>
              <p className="text-3xl text-green-600">Rp 1.200.000</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
