import React from 'react'

import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartContext } from "./CartContext";

export default function CartItem({ item }) {
  const { updateProduct, deleteProduct } = useContext(CartContext);

  function increase() {
    updateProduct(item.id, item.quantity + 1);
  }

  function decrease() {
    if (item.quantity > 1) {
      updateProduct(item.id, item.quantity - 1);
    } else {
      deleteProduct(item.id);
    }
  }

  function remove() {
    deleteProduct(item.id);
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row items-center gap-4">
      {/* Image */}
      <img src={item.image} alt={item.title} className="w-24 h-24 object-contain flex-shrink-0" />

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{item.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{item.category}</p>
        <p className="text-primary font-bold mt-1">${item.price}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
          <button
            onClick={decrease}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100 font-bold"
          >
            -
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={increase}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100 font-bold"
          >
            +
          </button>
        </div>

        <button
          onClick={remove}
          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition"
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
