import React, { useMemo } from "react";
import { useAuth } from "../Auth/useAuth";
import { useToast } from "../Toast/useToast";
import { CartContext } from "./cart.context";
import {
  useAddToCart,
  useCartItems,
  useClearCart,
  useDeleteCartItem,
  useUpdateCartItem,
} from "../../hooks/useCart";


export default function CartContextProvider({ children }) {
  const { showToast } = useToast();
  const { user } = useAuth();
  const userId = user?.id || "guest";

  const { data: cartItems = [] } = useCartItems(userId);
  const addToCartMutation = useAddToCart(userId);
  const updateProductMutation = useUpdateCartItem(userId);
  const deleteProductMutation = useDeleteCartItem(userId);
  const clearCartMutation = useClearCart(userId);

  const totalCartPrice = useMemo(
    () =>
      cartItems
        .reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
        .toFixed(2),
    [cartItems],
  );

  const addToCart = async (product, quantity = 1) => {
    try {
      await addToCartMutation.mutateAsync({ product, quantity });

      showToast(
        `Added ${quantity} ${product.title.substring(0, 20)}... to cart`,
        "success",
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("Failed to sync with server", "warning");
    }
  };

  const updateProduct = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateProductMutation.mutateAsync({ id, newQuantity });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductMutation.mutateAsync(id);
      showToast("Item removed from cart", "info");
    } catch (e) {
      console.error(e);
    }
  };

  const clearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  const totalItems = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
