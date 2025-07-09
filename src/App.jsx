// ✅ FILE: src/App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 📄 Halaman Publik
import Etalase from './pages/public/Etalase';
import DpoiCar from './pages/public/DpoiCar';
import DpoiStore from './pages/public/DpoiStore';
import DpoiFood from './pages/public/DpoiFood';
import DpoiOrders from './pages/public/DpoiOrders';

// 📄 Halaman Login
import Login from './pages/Login';

// 📄 Dashboard Role
import AppAdmin from './AppAdmin';
import AppSeller from './AppSeller';
import DriverDashboardFinal from './pages/driver/DriverDashboardFinal';
import DpoiDriverOrderDetail from './pages/driver/DpoiDriverOrderDetail';

// 📄 Finance Pages
import FinanceUserPage from './pages/finance/FinanceUserPage';
import FinanceLastTransaction from './pages/finance/FinanceLastTransaction';

// 📄 Seller Pages
import SellerLayout from './pages/seller/SellerLayout';
import SellerDashboard from './pages/seller/SellerDashboard';
import ProductManagementSeller from './pages/seller/ProductManagementSeller';
import SellerDisclaimer from './pages/seller/SellerDisclaimer';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [agreed, setAgreed] = useState(localStorage.getItem('disclaimerAccepted') === 'true');

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('role'));
      setAgreed(localStorage.getItem('disclaimerAccepted') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>

        {/* 🔓 Halaman Publik */}
        {!token && (
          <>
            <Route path="/" element={<Etalase />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dpoi-car" element={<DpoiCar />} />
            <Route path="/dpoi-store" element={<DpoiStore />} />
            <Route path="/dpoi-food" element={<DpoiFood />} />
            <Route path="/dpoi-orders/:orderId" element={<DpoiOrders />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* 🔐 Admin */}
        {token && role === 'admin' && (
          <>
            <Route path="/*" element={<AppAdmin />} />
            <Route path="/finance/last" element={<FinanceLastTransaction />} />
          </>
        )}

        {/* 🔐 Seller */}
        {token && role === 'penjual' && (
          <>
            <Route path="/seller/disclaimer" element={<SellerDisclaimer />} />
            {agreed ? (
              <Route path="/seller/*" element={<SellerLayout />}>
                <Route index element={<SellerDashboard />} />
                <Route path="products" element={<ProductManagementSeller />} />
              </Route>
            ) : (
              <Route path="/seller/*" element={<Navigate to="/seller/disclaimer" />} />
            )}
          </>
        )}

        {/* 🔐 Driver */}
        {token && role === 'driver' && (
          <>
            <Route path="/dashboard/driver" element={<DriverDashboardFinal />} />
            <Route path="/driver/order/:id" element={<DpoiDriverOrderDetail />} />
            <Route path="*" element={<Navigate to="/dashboard/driver" />} />
          </>
        )}

        {/* 🔐 Keuangan */}
        {token && role === 'keuangan' && (
          <>
            <Route path="/finance/user" element={<FinanceUserPage />} />
            <Route path="*" element={<Navigate to="/finance/user" />} />
          </>
        )}

        {/* ❌ Role tidak valid */}
        {token && !['admin', 'penjual', 'driver', 'keuangan'].includes(role) && (
          <Route path="*" element={<Navigate to="/" />} />
        )}

      </Routes>
    </Router>
  );
}
