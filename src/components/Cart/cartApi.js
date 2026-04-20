import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/carts";
const CART_KEY_PREFIX = "cart_";

const getCartStorageKey = (userId) => `${CART_KEY_PREFIX}${userId || "guest"}`;

export const getCartApi = async (userId) => {
  const savedCart = localStorage.getItem(getCartStorageKey(userId));
  return savedCart ? JSON.parse(savedCart) : [];
};

export const saveCartApi = async (userId, cartItems) => {
  localStorage.setItem(getCartStorageKey(userId), JSON.stringify(cartItems));
  return cartItems;
};

// FakeStoreAPI docs: Add to cart
export const addToCartApi = async (payload) => {
  const response = await axios.post(BASE_URL, payload);
  return response.data;
};

// FakeStoreAPI docs: Update cart (FakeStore uses PUT /carts/:id)
export const updateCartApi = async (cartId, payload) => {
  const response = await axios.put(`${BASE_URL}/${cartId}`, payload);
  return response.data;
};

// FakeStoreAPI docs: Delete cart
export const deleteCartApi = async (cartId) => {
  const response = await axios.delete(`${BASE_URL}/${cartId}`);
  return response.data;
};
