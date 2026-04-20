import React from 'react'

import { useCart } from "./useCart";
import Button from "../UI/Button";
import Card from "../UI/Card";

export default function CartItem({ item }) {
  const { updateProduct, deleteProduct } = useCart();

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
    <Card
      padding="sm"
      shadow="sm"
      className="border-gray-100 flex flex-col sm:flex-row items-center gap-4"
    >
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
          <Button
            onClick={decrease}
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-white border-0 rounded-md shadow-sm hover:bg-gray-100 font-bold"
          >
            -
          </Button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <Button
            onClick={increase}
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-white border-0 rounded-md shadow-sm hover:bg-gray-100 font-bold"
          >
            +
          </Button>
        </div>

        <Button
          onClick={remove}
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
          title="Remove item"
        >
          🗑️
        </Button>
      </div>
    </Card>
  );
}
