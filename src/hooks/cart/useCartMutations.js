import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToCartApi,
  updateCartApi,
  deleteCartApi,
} from "../../components/Cart/cartApi";
import { getCartQueryKey, getStorageKey } from "./useCart.constants";
import { writeCartToStorage } from "./useCart.storage";

export const useCartMutations = ({ userId, showToast }) => {
  const queryClient = useQueryClient();
  const safeUserId = userId || "guest";
  const queryKey = getCartQueryKey(safeUserId);
  const storageKey = getStorageKey(safeUserId);

  const setCartItems = (updater) => {
    queryClient.setQueryData(queryKey, (previous = []) => {
      const nextItems =
        typeof updater === "function" ? updater(previous) : updater;

      writeCartToStorage(storageKey, nextItems);
      return nextItems;
    });
  };

  const addMutation = useMutation({
    mutationFn: async ({ product, quantity }) => {
      const apiUserId = safeUserId === "guest" ? 2 : safeUserId;
      await addToCartApi({
        userId: apiUserId,
        date: new Date().toISOString().split("T")[0],
        products: [{ productId: product.id, quantity }],
      });
      return { product, quantity };
    },
    onMutate: ({ product, quantity }) => {
      setCartItems((prev) => {
        const exists = prev.find((i) => i.id === product.id);
        if (exists) {
          return prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { ...product, quantity }];
      });
    },
    onSuccess: (_data, { product, quantity }) => {
      const title = (product?.title || "").substring(0, 20);
      showToast(`Added ${quantity} ${title}...`, "success");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, newQuantity }) => {
      const cartId = safeUserId === "guest" ? 1 : safeUserId;
      await updateCartApi(cartId, {
        products: [{ productId: id, quantity: newQuantity }],
      });
      return { id, newQuantity };
    },
    onMutate: ({ id, newQuantity }) => {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id }) => {
      const cartId = safeUserId === "guest" ? 1 : safeUserId;
      await deleteCartApi(cartId);
      return { id };
    },
    onMutate: ({ id }) => {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    },
    onSuccess: () => {
      showToast("Item removed", "info");
    },
  });

  return {
    setCartItems,
    addMutation,
    updateMutation,
    deleteMutation,
  };
};
