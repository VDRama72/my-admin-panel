// ✅ FILE: src/components/public/FoodCard.jsx

import React from 'react';

const baseURL = 'http://localhost:4000';

export default function FoodCard({ food, onAddToCart }) {
  return (
    <div className="bg-white border rounded-md shadow-sm hover:shadow-md transition-all overflow-hidden w-[140px] text-left">
      <div className="w-full h-24 bg-gray-100 overflow-hidden rounded-t-md">
        <img
          src={food.image ? `${baseURL}${food.image}` : 'https://via.placeholder.com/180x120?text=No+Image'}
          alt={food.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/180x120?text=No+Image';
            e.target.style.display = 'block';
          }}
        />
      </div>
      <div className="p-2 pt-1 pb-2">
        <h3 className="text-xs font-semibold text-gray-800 truncate">{food.name}</h3>
        <p className="text-red-600 text-xs font-bold mt-0.5">
          Rp {food.price.toLocaleString('id-ID')}
        </p>
        <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-2">{food.description}</p>
        <button
          onClick={onAddToCart}
          className="mt-1 w-full text-[11px] bg-red-600 text-white py-1 rounded hover:bg-red-700 transition"
        >
          Tambah ke 🛒
        </button>
      </div>
    </div>
  );
}
