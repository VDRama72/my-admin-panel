import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import DashboardAdmin from './pages/dashboards/DashboardAdmin';
import UserManagement from './pages/admin/UserManagement';
import ProductManagementAdmin from './pages/admin/ProductManagementAdmin';

import SellerDashboard from './pages/seller/SellerDashboard';
import ProductManagementSeller from './pages/seller/ProductManagementSeller';

import Etalase from './pages/public/Etalase';
import Login from './pages/Login';

export default function App() {
  const isAdmin = localStorage.getItem('adminToken');
  const role = localStorage.getItem('role'); // bisa "admin" atau "penjual"

  return (
    <Router>
      <Routes>

        {/* 🔓 Halaman publik */}
        <Route path="/" element={<Etalase />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Halaman ADMIN */}
        {isAdmin && role === 'admin' && (
          <Route
            path="/*"
            element={
              <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto p-6">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/dashboard/admin" element={<DashboardAdmin />} />
                      <Route path="/dashboard/admin/users" element={<UserManagement />} />
                      <Route path="/dashboard/admin/products" element={<ProductManagementAdmin />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        )}

        {/* 🧑‍🍳 Halaman PENJUAL */}
        {isAdmin && role === 'penjual' && (
          <Route
            path="/*"
            element={
              <Routes>
                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="/seller/products" element={<ProductManagementSeller />} />
                <Route path="*" element={<Navigate to="/seller/dashboard" />} />
              </Routes>
            }
          />
        )}

        {/* 🔁 Default redirect jika tidak sesuai role */}
        {!isAdmin && (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}
