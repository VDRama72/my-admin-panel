// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { logout } from '../utils/auth';

export default function Navbar() {
  const [userName, setUserName] = useState('Pengguna');
  const [role, setRole] = useState('');

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'Pengguna');
    setRole(localStorage.getItem('role') || '');
  }, []);

  return (
    <div className="bg-white shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <div className="text-lg font-bold text-gray-800">
        D’PoIN Admin Panel
        <span className="text-sm text-gray-500 ml-1">({role?.toUpperCase()})</span>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-700 font-medium">👋 Hai, {userName}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
