export default function AppAdmin() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar selalu di atas */}
      <Navbar />

      {/* Bagian utama: Sidebar + Main content */}
      <div className="flex flex-col sm:flex-row flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/admin" element={<DashboardAdmin />} />
            <Route path="/dashboard/admin/users" element={<UserManagement />} />
            <Route path="/dashboard/admin/products" element={<ProductManagementAdmin />} />
            <Route path="/dashboard/admin/orders" element={<OrderManagementAdmin />} />
            <Route path="/dashboard/admin/rentals" element={<RentalManagementAdmin />} />
            <Route path="/dashboard/admin/finance" element={<FinanceManagementAdmin />} />
            <Route path="/dashboard/admin/finance/last" element={<FinanceLastTransactions />} />
            <Route path="/dashboard/admin/cs" element={<CSManagementAdmin />} />
            <Route path="/dashboard/admin/promo" element={<PromoManagementAdmin />} />
            <Route path="/dashboard/admin/reports" element={<ReportAnalyticsAdmin />} />
            <Route path="/dashboard/admin/settings" element={<SystemSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
