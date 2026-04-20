import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCartApi,
  deleteCartApi,
  getCartApi,
  saveCartApi,
  updateCartApi,
} from "../components/Cart/cartApi";

const DEFAULT_USER_KEY = "guest";
const DEFAULT_API_USER_ID = 2;
const FAKESTORE_CART_ID = 1;

const getCartQueryKey = (userId) => ["cart", userId || DEFAULT_USER_KEY];

const getApiUserId = (userId) => {
  const parsedUserId = Number(userId);
  return Number.isFinite(parsedUserId) && parsedUserId > 0
    ? parsedUserId
    : DEFAULT_API_USER_ID;
}; 

const buildCartPayload = (userId, productId, quantity) => ({
  userId: getApiUserId(userId),
  date: new Date().toISOString().split("T")[0],
  products: [{ productId, quantity }],
});

const saveCart = async (queryClient, userId, updater) => {
  const queryKey = getCartQueryKey(userId);
  const currentCart = queryClient.getQueryData(queryKey) || [];
  const nextCart = updater(currentCart);

  queryClient.setQueryData(queryKey, nextCart);
  await saveCartApi(userId, nextCart);

  return nextCart;
};

export const useCartItems = (userId) => {
  return useQuery({
    queryKey: getCartQueryKey(userId),
    queryFn: () => getCartApi(userId),
    initialData: [],
  });
};

export const useAddToCart = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product, quantity = 1 }) => {
      const nextCart = await saveCart(
        queryClient,
        userId,
        (current) => {
          const existing = current.find((item) => item.id === product.id);

          if (existing) {
            return current.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          }

          return [...current, { ...product, quantity }];
        },
      );

      await addToCartApi(buildCartPayload(userId, product.id, quantity));

      return nextCart;
    },
  });
};

export const useUpdateCartItem = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newQuantity }) => {
      const nextCart = await saveCart(
        queryClient,
        userId,
        (current) =>
          current.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item,
          ),
      );

      await updateCartApi(
        FAKESTORE_CART_ID,
        buildCartPayload(userId, id, newQuantity),
      );

      return nextCart;
    },
  });
};

export const useDeleteCartItem = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const nextCart = await saveCart(queryClient, userId, (current) =>
        current.filter((item) => item.id !== id),
      );

      await deleteCartApi(FAKESTORE_CART_ID);

      return nextCart;
    },
  });
};

export const useClearCart = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      queryClient.setQueryData(getCartQueryKey(userId), []);
      await saveCartApi(userId, []);
      return [];
    },
  });
};