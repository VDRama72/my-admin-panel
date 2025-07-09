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
    <div className="bg-white shadow p-4 flex justify-between items-center px-4 sm:px-6">
      <div className="text-lg sm:text-xl font-bold text-gray-800">
        D’PoIN Admin Panel
        <span className="text-sm text-gray-500 ml-3 font-normal hidden sm:inline">
          ({role?.toUpperCase()})
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-gray-700 font-medium hidden sm:block">
          👋 Hai, {userName}
        </span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
