// ✅ FILE: src/pages/public/DpoiOrder.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import useTitle from '../../hooks/useTitle';
import ChatBox from '../../components/ChatBox';

export default function DpoiOrder() {
  useTitle("Tracking Pesanan");

  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showLunasButton, setShowLunasButton] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Gagal mengambil detail pesanan:', err);
        setNotFound(true);
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setShowLunasButton(true);
  };

  const handleLunas = async () => {
    try {
      await api.put(`/orders/${orderId}`, { status: 'completed' });
      alert('✅ Pembayaran dikonfirmasi. Terima kasih!');
      setOrder(prev => ({ ...prev, status: 'completed' }));
    } catch (err) {
      console.error('❌ Gagal menyelesaikan pesanan:', err);
      alert('Gagal menyelesaikan pesanan.');
    }
  };

  const statusLabel = {
    pending: 'Menunggu Driver',
    accepted: 'Sudah Diambil Driver',
    on_delivery: 'Sedang Diantar',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  };

  if (loading) return <div className="p-10 text-center">Memuat pesanan...</div>;
  if (notFound || !order) return <div className="p-10 text-center text-red-500">Pesanan tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-red-600 text-white py-4 px-6 shadow sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-xl font-bold">📦 Tracking Pesanan</h1>
        <Link to="/" className="text-sm bg-white text-red-600 px-3 py-1 rounded hover:bg-gray-100">Kembali ke Etalase</Link>
      </header>

      <main className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Detail Pesanan Anda</h2>

        <div className="bg-white rounded-lg shadow p-5 space-y-4 border">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Status:</span>
            <span className="font-bold text-red-600">{statusLabel[order.status]}</span>
          </div>

          {order.guestName && (
            <div className="flex justify-between">
              <span className="text-gray-600">Nama Tamu:</span>
              <span>{order.guestName}</span>
            </div>
          )}
          {order.guestPhone && (
            <div className="flex justify-between">
              <span className="text-gray-600">No HP:</span>
              <span>{order.guestPhone}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Alamat Pengantaran:</span>
            <span className="text-right">{order.deliveryAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Alamat Warung:</span>
            <span className="text-right">{order.pickupAddress}</span>
          </div>

          {order.driverInfo && (
            <div className="mt-6 p-4 border border-green-300 bg-green-50 rounded-lg">
              <p className="text-green-700 font-semibold">🚗 Driver yang akan mengantar:</p>
              <div className="mt-2">
                <p><strong>Nama:</strong> {order.driverInfo.name}</p>
                <p><strong>No HP:</strong> {order.driverInfo.phone}</p>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2 mt-4">🧾 Daftar Pesanan:</h3>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between py-2">
                  <span>{item.name} x{item.qty}</span>
                  <span>Rp {(item.qty * item.price).toLocaleString('id-ID')}</span>
                </li>
              ))}
            </ul>
            <div className="text-right mt-3 font-bold text-lg text-red-700">
              Total: Rp {order.totalAmount.toLocaleString('id-ID')}
            </div>
          </div>

          {/* ✅ Fitur pembayaran */}
          {order.status === 'on_delivery' && (
            <div className="mt-6 border-t pt-4">
              <h4 className="text-lg font-semibold mb-2">💳 Pilih Metode Pembayaran:</h4>
              <div className="space-x-4 mb-3">
                <label>
                  <input type="radio" name="payment" value="cash" onChange={handlePaymentMethodChange} />
                  <span className="ml-2">Cash</span>
                </label>
                <label>
                  <input type="radio" name="payment" value="ovo" onChange={handlePaymentMethodChange} />
                  <span className="ml-2">OVO</span>
                </label>
                <label>
                  <input type="radio" name="payment" value="gopay" onChange={handlePaymentMethodChange} />
                  <span className="ml-2">GoPay</span>
                </label>
              </div>

              {showLunasButton && (
                <button
                  onClick={handleLunas}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  ✅ Sudah Lunas
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-8">
          <ChatBox orderId={orderId} sender="guest" />
        </div>
      </main>

      <footer className="bg-red-100 text-center py-5 text-sm text-red-600 font-medium mt-10">
        © {new Date().getFullYear()} D'PoIN Food
      </footer>
    </div>
  );
}
