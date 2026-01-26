import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToCartApi,
  updateCartApi,
  deleteCartApi,
} from "./cartApi";
import { useAuth } from "../Auth/AuthContext";
import { useToast } from "../Toast/Toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { showToast } = useToast();
  // Local state for cart to make it work with stateless FakeStoreAPI
  const [cartItems, setCartItems] = useState([]);

  // Calculate total price
  const totalCartPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0).toFixed(2);

  const addToCart = async (product, quantity = 1) => {
    try {
      // Update local state
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
      });

      // API Call (Mock)
      const payload = {
        userId: 2,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: product.id, quantity }]
      };
      await addToCartApi(payload);

      showToast(`Added ${quantity} ${product.title.substring(0, 20)}... to cart`, "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("Failed to sync with server", "warning");
    }
  };

  const updateProduct = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    // Mock API call
    try {
      await updateCartApi(1, { products: [{ productId: id, quantity: newQuantity }] });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProduct = async (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast("Item removed from cart", "info");

    // Mock API call
    try {
      await deleteCartApi(1);
    } catch (e) {
      console.error(e);
    }
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartPrice,
        addToCart,
        updateProduct,
        deleteProduct,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
}