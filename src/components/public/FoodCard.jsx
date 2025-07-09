// ✅ FILE: src/components/public/FoodCard.jsx

import React from 'react';

const baseURL = import.meta.env.VITE_BACKEND_URL?.replace('/api', '') || '';

export default function FoodCard({ food, onAddToCart }) {
  return (
    <div className="bg-white border rounded-md shadow-sm hover:shadow-md transition-all overflow-hidden w-full max-w-[160px] sm:max-w-[180px] text-left">
      <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={
            food.image
              ? `${baseURL}${food.image.startsWith('/') ? '' : '/'}${food.image}`
              : 'https://via.placeholder.com/180x120?text=No+Image'
          }
          alt={food.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/180x120?text=No+Image';
          }}
        />
      </div>
      <div className="p-2 pt-1 pb-2">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{food.name}</h3>
        <p className="text-red-600 text-sm font-bold mt-1">
          Rp {food.price.toLocaleString('id-ID')}
        </p>
        <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-2">{food.description}</p>
        <button
          onClick={onAddToCart}
          className="mt-2 w-full text-xs bg-red-600 text-white py-1 rounded hover:bg-red-700 transition"
        >
          Tambah ke 🛒
        </button>
      </div>
    </div>
  );
}
