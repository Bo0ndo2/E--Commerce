import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/carts";

// FakeStoreAPI docs: Get user cart by user id (simulating user 2)
export const getCartApi = () =>
  axios.get(`${BASE_URL}/user/2`);

// FakeStoreAPI docs: Add to cart
export const addToCartApi = (payload) =>
  axios.post(BASE_URL, payload);

// FakeStoreAPI docs: Update cart (FakeStore uses PUT /carts/:id)
export const updateCartApi = (cartId, payload) =>
  axios.put(`${BASE_URL}/${cartId}`, payload);

// FakeStoreAPI docs: Delete cart
export const deleteCartApi = (cartId) =>
  axios.delete(`${BASE_URL}/${cartId}`);
