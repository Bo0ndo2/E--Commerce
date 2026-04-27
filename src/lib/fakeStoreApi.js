import axios from "axios";

export const FAKE_STORE_BASE_URL = "https://fakestoreapi.com";

export const fakeStoreApi = axios.create({
  baseURL: FAKE_STORE_BASE_URL,
});
