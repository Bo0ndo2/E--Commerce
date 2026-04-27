import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
import { useCartQuery } from "./cart/useCartQuery";
import { useCartMutations } from "./cart/useCartMutations";

export const useCart = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const userId = user?.id || "guest";
  const { data: cartItems = [] } = useCartQuery(userId);
  const { setCartItems, addMutation, updateMutation, deleteMutation } =
    useCartMutations({ userId, showToast });

  const addToCart = (product, quantity = 1) => {
    addMutation.mutate({ product, quantity });
  };

  const updateProduct = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateMutation.mutate({ id, newQuantity });
  };

  const deleteProduct = (id) => {
    deleteMutation.mutate({ id });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = useMemo(
    () => cartItems.reduce((t, i) => t + i.quantity, 0),
    [cartItems]
  );

  const totalCartPrice = useMemo(
    () =>
      cartItems
        .reduce((t, i) => t + i.price * i.quantity, 0)
        .toFixed(2),
    [cartItems]
  );

  return {
    state: {
      cartItems,
      totalItems,
    },
    cartItems,
    totalCartPrice,
    addToCart,
    updateProduct,
    deleteProduct,
    clearCart,
  };
};