// src/pages/admin/UserManagement.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('semua');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'pembeli',
    namaWarung: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async (filter = 'semua') => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const url = filter === 'semua'
        ? `${API_BASE}/users`
        : `${API_BASE}/users?role=${filter}`;

      const res = await axios.get(url, { headers });
      setUsers(res.data);
    } catch (err) {
      console.error('❌ Gagal mengambil data pengguna:', err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchUsers(roleFilter);
  }, [roleFilter]);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    if (!editMode && (!newUser.name || !newUser.email || !newUser.password)) {
      alert('Harap isi semua field (kecuali password saat edit).');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      if (editMode && editingUser) {
        const payload = {
          name: editingUser.name,
          email: editingUser.email,
          password: editingUser.password,
          role: editingUser.role,
        };

        if (editingUser.role === 'penjual') {
          payload.namaWarung = editingUser.namaWarung || '';
        }

        await axios.put(`${API_BASE}/users/${editingUserId}`, payload, { headers });
        setEditMode(false);
        setEditingUserId(null);
        setEditingUser(null);
      } else {
        const payload = {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
        };

        if (newUser.role === 'penjual') {
          payload.namaWarung = newUser.namaWarung || '';
        }

        await axios.post(`${API_BASE}/users`, payload, { headers });
      }

      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'pembeli',
        namaWarung: ''
      });

      fetchUsers(roleFilter);
    } catch (err) {
      console.error('❌ Gagal menyimpan pengguna:', err.response?.data?.msg || err);
      alert(err.response?.data?.msg || 'Terjadi kesalahan');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus pengguna ini?')) return;
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      await axios.delete(`${API_BASE}/users/${id}`, { headers });
      fetchUsers(roleFilter);
    } catch (err) {
      console.error('❌ Gagal menghapus pengguna:', err.response?.data || err);
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditingUserId(user._id);
    setEditingUser({ ...user, password: '' });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingUserId(null);
    setEditingUser(null);
    setNewUser({ name: '', email: '', password: '', role: 'pembeli', namaWarung: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">👥 Manajemen Pengguna</h2>

      {/* Form Tambah/Edit Pengguna */}
      {!editMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="name" placeholder="Nama" value={newUser.name} onChange={handleInputChange} className="border p-2 rounded w-full" />
          <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} className="border p-2 rounded w-full" />
          <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleInputChange} className="border p-2 rounded w-full" />
          <select name="role" value={newUser.role} onChange={handleInputChange} className="border p-2 rounded w-full">
            <option value="admin">Admin</option>
            <option value="keuangan">Keuangan</option>
            <option value="cs">CS</option>
            <option value="driver">Driver</option>
            <option value="penjual">Penjual</option>
            <option value="pembeli">Pembeli</option>
          </select>
          {newUser.role === 'penjual' && (
            <input type="text" name="namaWarung" placeholder="Nama Warung" value={newUser.namaWarung} onChange={handleInputChange} className="border p-2 rounded w-full" />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="name" placeholder="Nama" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} className="border p-2 rounded w-full" />
          <input type="email" name="email" placeholder="Email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} className="border p-2 rounded w-full" />
          <input type="password" name="password" placeholder="Kosongkan jika tidak diubah" value={editingUser.password} onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })} className="border p-2 rounded w-full" />
          <select name="role" value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} className="border p-2 rounded w-full">
            <option value="admin">Admin</option>
            <option value="keuangan">Keuangan</option>
            <option value="cs">CS</option>
            <option value="driver">Driver</option>
            <option value="penjual">Penjual</option>
            <option value="pembeli">Pembeli</option>
          </select>
          {editingUser.role === 'penjual' && (
            <input type="text" name="namaWarung" placeholder="Nama Warung" value={editingUser.namaWarung || ''} onChange={(e) => setEditingUser({ ...editingUser, namaWarung: e.target.value })} className="border p-2 rounded w-full" />
          )}
        </div>
      )}

      {/* Tombol Simpan / Tambah */}
      <div className="flex gap-3 mb-6">
        <button onClick={handleCreateUser} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          {editMode ? 'Simpan Perubahan' : 'Tambah Pengguna'}
        </button>
        {editMode && (
          <button onClick={handleCancelEdit} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
            Batal Edit
          </button>
        )}
      </div>

      {/* Filter Role */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter Role:</label>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border p-2 rounded">
          <option value="semua">Semua</option>
          <option value="admin">Admin</option>
          <option value="keuangan">Keuangan</option>
          <option value="cs">CS</option>
          <option value="driver">Driver</option>
          <option value="penjual">Penjual</option>
          <option value="pembeli">Pembeli</option>
        </select>
      </div>

      {/* Tabel Pengguna */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 capitalize">{u.role}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(u)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">Edit</button>
                  <button onClick={() => handleDelete(u._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hapus</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-4">
                  Tidak ada data pengguna
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
