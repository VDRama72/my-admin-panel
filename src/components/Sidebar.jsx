// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClass = "hover:underline px-2 py-1 rounded";
  const activeClass = "bg-indigo-100 font-semibold";

  return (
    <>
      {/* Tombol Toggle Sidebar di HP */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`bg-white shadow p-4 fixed sm:static top-0 left-0 h-full z-40 transition-transform transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 w-64`}>
        <h2 className="text-xl font-bold mb-4 text-blue-700">🛠️ Admin Panel</h2>
        <nav className="flex flex-col gap-2 text-blue-700">

          <Link to="/dashboard/admin" className={`${linkClass} ${location.pathname === '/dashboard/admin' ? activeClass : ''}`}>
            🏠 Dashboard
          </Link>
          <Link to="/dashboard/admin/users" className={`${linkClass} ${location.pathname === '/dashboard/admin/users' ? activeClass : ''}`}>
            👥 Manajemen Pengguna
          </Link>
          <Link to="/dashboard/admin/products" className={`${linkClass} ${location.pathname === '/dashboard/admin/products' ? activeClass : ''}`}>
            📦 Manajemen Produk
          </Link>
          <Link to="/dashboard/admin/orders" className={`${linkClass} ${location.pathname === '/dashboard/admin/orders' ? activeClass : ''}`}>
            🧾 Manajemen Pesanan
          </Link>
          <Link to="/dashboard/admin/rentals" className={`${linkClass} ${location.pathname === '/dashboard/admin/rentals' ? activeClass : ''}`}>
            🚗 Manajemen Rental
          </Link>
          <Link to="/dashboard/admin/finance" className={`${linkClass} ${location.pathname === '/dashboard/admin/finance' ? activeClass : ''}`}>
            💰 Manajemen Keuangan
          </Link>
          <Link to="/dashboard/admin/cs" className={`${linkClass} ${location.pathname === '/dashboard/admin/cs' ? activeClass : ''}`}>
            ☎️ Manajemen CS & Komplain
          </Link>
          <Link to="/dashboard/admin/promo" className={`${linkClass} ${location.pathname === '/dashboard/admin/promo' ? activeClass : ''}`}>
            🎁 Manajemen Promo & Banner
          </Link>
          <Link to="/dashboard/admin/reports" className={`${linkClass} ${location.pathname === '/dashboard/admin/reports' ? activeClass : ''}`}>
            📊 Laporan & Analitik
          </Link>
          <Link to="/dashboard/admin/settings" className={`${linkClass} ${location.pathname === '/dashboard/admin/settings' ? activeClass : ''}`}>
            ⚙️ Pengaturan Sistem
          </Link>

        </nav>
      </aside>
    </>
  );
}
