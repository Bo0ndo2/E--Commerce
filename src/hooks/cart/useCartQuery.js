import { useQuery } from "@tanstack/react-query";
import { getCartQueryKey, getStorageKey } from "./useCart.constants";
import { readCartFromStorage } from "./useCart.storage";

export const useCartQuery = (userId) => {
  const safeUserId = userId || "guest";
  const storageKey = getStorageKey(safeUserId);

  return useQuery({
    queryKey: getCartQueryKey(safeUserId),
    queryFn: () => readCartFromStorage(storageKey),
    staleTime: Infinity,
  });
};
