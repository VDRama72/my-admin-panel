// ✅ FILE: src/components/public/FoodCard.jsx
import React from 'react';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function FoodCard({ food, onAddToCart }) {
  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-md transition-all w-full sm:w-[140px] max-w-[160px] flex flex-col text-left">
      <div className="w-full h-28 bg-gray-100 overflow-hidden rounded-t-lg">
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
      <div className="p-2 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{food.name}</h3>
        <p className="text-red-600 text-sm font-bold mt-0.5">
          Rp {food.price.toLocaleString('id-ID')}
        </p>
        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{food.description}</p>
        <button
          onClick={onAddToCart}
          className="mt-auto text-xs bg-red-600 text-white py-1 rounded hover:bg-red-700 transition mt-2"
        >
          Tambah ke 🛒
        </button>
      </div>
    </div>
  );
}
