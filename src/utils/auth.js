// src/utils/auth.js
export function logout() {
  const role = localStorage.getItem('role');

  // Hapus semua informasi auth
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('disclaimerAccepted');

  // 🔁 Paksa sinkronisasi ke komponen yang memakai localStorage
  window.dispatchEvent(new Event('storage'));

  // ✅ Redirect langsung ke Etalase
  window.location.href = '/';
}
