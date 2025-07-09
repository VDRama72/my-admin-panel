// src/pages/public/Checkout.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useTitle from '../../hooks/useTitle';

export default function Checkout() {
  useTitle('Checkout D’PoIN Food');
  const navigate = useNavigate();

  // Ambil cart dari localStorage (atau bisa dari Context, Redux, dll)
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('dpoin_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address || !phone) {
      setError('Mohon lengkapi nama, alamat, dan nomor telepon.');
      return;
    }
    setLoading(true);
    setError(null);

    const orderData = {
      customerName: name,
      address,
      phone,
      note,
      items: cart.map(({ _id, qty }) => ({ productId: _id, quantity: qty })),
      totalPrice,
      status: 'pending',
      createdAt: new Date(),
    };

    try {
      const res = await api.post('/orders', orderData);
      localStorage.removeItem('dpoin_cart'); // Kosongkan keranjang setelah order
      navigate(`/order-success/${res.data._id}`);
    } catch (err) {
      setError('Gagal submit order, coba lagi.');
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return <p className="text-center mt-10">Keranjang kosong. Silakan tambah produk dulu.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded mt-10">
      <h1 className="text-2xl font-bold mb-6">Checkout Pesanan</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nama Lengkap</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Alamat Lengkap</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Nomor Telepon</label>
          <input
            type="tel"
            className="w-full border px-3 py-2 rounded"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Catatan (opsional)</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>

        <div className="font-semibold text-right">
          Total Bayar: Rp {totalPrice.toLocaleString('id-ID')}
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition"
        >
          {loading ? 'Memproses...' : 'Konfirmasi Pesanan'}
        </button>
      </form>
    </div>
  );
}
