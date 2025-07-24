// ✅ FILE: src/services/socket.js

import { io } from 'socket.io-client';

const BACKEND_SOCKET_URL = 'http://localhost:4000'; // SESUAIKAN DENGAN URL BACKEND ANDA

const socket = io(BACKEND_SOCKET_URL, {
  // Pastikan origin di backend/server.js juga mengizinkan ini (misal: 'http://localhost:5173')
  // auth: { token: localStorage.getItem('token') } // Uncomment jika ada autentikasi JWT
});

socket.on('connect', () => {
  console.log('Socket.IO client connected:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Socket.IO client disconnected:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Socket.IO connection error:', error.message);
});

export default socket;