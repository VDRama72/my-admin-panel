// src/services/socket.js

import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // sesuaikan URL backend

export default socket;
