// ✅ FILE: src/pages/driver/DpoiDriverOrderDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import socket from '../../services/socket';

export default function DpoiDriverOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchOrder();

    socket.on(`chat_order_${id}`, (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off(`chat_order_${id}`);
    };
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      setNotFound(true);
      console.error('Order tidak ditemukan atau sudah dihapus.');
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    const msg = { orderId: id, from: 'driver', to: 'customer', message };
    socket.emit('chat_message', msg);
    setChat((prev) => [...prev, msg]);
    setMessage('');
  };

  if (notFound) {
    return (
      <div className="p-4 max-w-2xl mx-auto text-center text-gray-600">
        ❌ Order tidak ditemukan atau sudah dihapus.
        <div className="mt-4">
          <Link to="/dashboard/driver" className="text-blue-600 underline">← Kembali</Link>
        </div>
      </div>
    );
  }

  if (!order) return <div className="p-4">Memuat...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">📦 Detail Order</h1>
      <div className="mb-4">
        <p><strong>Alamat Jemput:</strong> {order.pickupAddress}</p>
        <p><strong>Tujuan:</strong> {order.deliveryAddress}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Guest:</strong> {order.guestName} ({order.guestPhone})</p>
      </div>

      <div className="border-t pt-4">
        <h2 className="font-semibold mb-2">💬 Chat dengan Tamu</h2>
        <div className="border p-2 h-48 overflow-y-auto bg-gray-50 mb-2 rounded">
          {chat.length === 0 && (
            <p className="text-gray-400 italic">Belum ada pesan.</p>
          )}
          {chat.map((c, i) => (
            <div key={i} className="mb-1">
              <strong>{c.from}:</strong> {c.message}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="border p-2 rounded flex-1"
            placeholder="Ketik pesan..."
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
          >
            Kirim
          </button>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/dashboard/driver" className="text-blue-600 underline">← Kembali ke daftar order</Link>
      </div>
    </div>
  );
}
