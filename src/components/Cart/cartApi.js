import { fakeStoreApi } from "../../lib/fakeStoreApi";

const CARTS_RESOURCE = "/carts";

// FakeStoreAPI docs: Get user cart by user id (simulating user 2)
export const getCartApi = () =>
  fakeStoreApi.get(`${CARTS_RESOURCE}/user/2`);

// FakeStoreAPI docs: Add to cart
export const addToCartApi = (payload) =>
  fakeStoreApi.post(CARTS_RESOURCE, payload);

// FakeStoreAPI docs: Update cart (FakeStore uses PUT /carts/:id)
export const updateCartApi = (cartId, payload) =>
  fakeStoreApi.put(`${CARTS_RESOURCE}/${cartId}`, payload);

// FakeStoreAPI docs: Delete cart
export const deleteCartApi = (cartId) =>
  fakeStoreApi.delete(`${CARTS_RESOURCE}/${cartId}`);
