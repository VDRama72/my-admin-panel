// src/utils/auth.js

export function logout() {
  const role = localStorage.getItem('role');

  // Hapus semua informasi auth
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');

  // 🔁 Paksa sinkronisasi ke komponen yang memakai localStorage
  window.dispatchEvent(new Event('storage'));

  // 🔁 Redirect
  if (role === 'penjual') {
    window.location.href = '/login'; // misalnya nanti ada login seller
  } else {
    window.location.href = '/login'; // bisa juga '/' tergantung kebutuhan
  }
}
