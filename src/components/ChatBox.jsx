// ✅ FILE: src/components/ChatBox.jsx

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000');

export default function ChatBox({ orderId, sender }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef();

  // Bergabung ke ruang chat sesuai ID order
  useEffect(() => {
    if (!orderId) return;

    socket.emit('join-room', orderId);

    socket.on('chat-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit('leave-room', orderId);
      socket.off('chat-message');
    };
  }, [orderId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message = {
      sender,
      message: input.trim(),
      timestamp: new Date().toISOString()
    };

    // Tampilkan langsung secara lokal
    setMessages((prev) => [...prev, message]);

    // Kirim ke server
    socket.emit('chat-message', {
      roomId: orderId,
      ...message
    });

    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="mt-6 border rounded-lg p-4 bg-white">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">💬 Obrolan Pengantaran</h3>

      <div className="h-64 overflow-y-auto border p-3 mb-2 rounded bg-gray-50 text-sm">
        {messages.map((msg, idx) => {
          const isOwn = msg.sender === sender;
          return (
            <div key={idx} className={`mb-1 ${isOwn ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block px-3 py-1 rounded ${
                  isOwn ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {msg.message}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
