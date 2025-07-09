// ✅ FILE: src/pages/driver/DriverDashboardFinal.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DriverDashboardFinal = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [driverName, setDriverName] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      const allOrders = res.data;

      const filtered = allOrders.filter(order =>
        (order.status === 'pending' && !order.driverId) ||
        (order.driverId === userId)
      );

      setOrders(filtered);
    } catch (err) {
      console.error('Gagal mengambil order driver:', err);
    }
  };

  const fetchDriverProfile = async () => {
    try {
      const res = await api.get(`/users/${userId}`);
      setDriverName(res.data.name);
    } catch (err) {
      console.error('Gagal mengambil data driver:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchDriverProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await api.post(`/orders/accept/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      console.error('Gagal menerima order:', err);
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}`, { status: 'on_delivery' }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      console.error('Gagal update status on_delivery:', err);
    }
  };

  const handleMarkAsCompleted = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}`, { status: 'completed' }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      console.error('Gagal menyelesaikan order:', err);
    }
  };

  const filteredOrders = statusFilter
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-yellow-700">Dashboard Driver</h2>
        <div className="text-right">
          <p className="font-semibold">👤 {driverName}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm mt-1 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-4 flex justify-start">
        <label className="mr-2">Status:</label>
        <select
          className="border rounded px-2 py-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Semua</option>
          <option value="pending">Pending</option>
          <option value="accepted">Diterima</option>
          <option value="on_delivery">Sedang Diantar</option>
          <option value="completed">Selesai</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="border p-4 rounded-lg shadow-md bg-white">
            <p><strong>Alamat Jemput:</strong> {order.pickupAddress}</p>
            <p><strong>Tujuan:</strong> {order.deliveryAddress}</p>
            <p><strong>Status:</strong> <span className="text-blue-700 font-semibold">{order.status}</span></p>
            <div className="mt-2 space-x-2">
              {order.status === 'pending' && !order.driverId ? (
                <button onClick={() => handleAcceptOrder(order._id)} className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800">
                  Terima Order
                </button>
              ) : order.driverId === userId && order.status === 'accepted' ? (
                <button onClick={() => handleMarkAsDelivered(order._id)} className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600">
                  🚚 Pesanan Dikirim
                </button>
              ) : order.driverId === userId && order.status === 'on_delivery' ? (
                <button onClick={() => handleMarkAsCompleted(order._id)} className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800">
                  ✅ Selesaikan Order
                </button>
              ) : null}

              <button onClick={() => navigate(`/driver/order/${order._id}`)} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                Detail & Chat
              </button>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <p className="text-gray-500 italic">Tidak ada pesanan ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default DriverDashboardFinal;
