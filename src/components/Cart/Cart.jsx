import React from 'react'
import { useCart } from "./useCart";
import CartItem from "./CartItem";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Stack from "../UI/Stack";

import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, totalCartPrice } = useCart();
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

      <Stack gap={4}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </Stack>

      <Card className="mt-8 bg-gray-50 border-gray-200" shadow="sm">
        <h3 className="text-xl font-bold flex justify-between items-center text-gray-800">
          <span>Total Price:</span>
          <span className="text-primary text-2xl">${totalCartPrice}</span>
        </h3>
        <Button
          onClick={() => navigate('/checkout')}
          fullWidth
          size="lg"
          className="mt-4"
        >
          Checkout
        </Button>
      </Card>
    </div>
  );
}
