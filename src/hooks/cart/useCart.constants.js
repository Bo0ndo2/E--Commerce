export const CART_QUERY_KEY = "cart";

export const getStorageKey = (userId) => {
  return `cart_${userId || "guest"}`;
};

export const getCartQueryKey = (userId) => {
  return [CART_QUERY_KEY, userId || "guest"];
};
