import React from 'react'
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "./CartContext";
import CartItem from "./CartItem";

import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, totalCartPrice } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
        <p className="text-gray-500">Go add some products!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold flex justify-between items-center text-gray-800">
          <span>Total Price:</span>
          <span className="text-primary text-2xl">${totalCartPrice}</span>
        </h3>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
