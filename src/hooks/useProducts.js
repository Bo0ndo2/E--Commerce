import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const FAKESTORE_URL = 'https://fakestoreapi.com';
const DUMMYJSON_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  timeout: 10000,
});

const normalizeDummyProduct = (product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  category: product.category,
  image: product.thumbnail || product.images?.[0] || '',
  rating: {
    rate: typeof product.rating === 'number' ? product.rating : 0,
    count: typeof product.stock === 'number' ? product.stock : 0,
  },
});

const normalizeDummyCategories = (categories) =>
  categories.map((category) => {
    if (typeof category === 'string') {
      return category;
    }

    if (category && typeof category === 'object') {
      return category.slug || category.name || '';
    }

    return '';
  }).filter(Boolean);

const fetchProductsFromFakeStore = async () => {
  const response = await apiClient.get(`${FAKESTORE_URL}/products`);
  return response.data;
};

const fetchProductsFromDummyJson = async () => {
  const response = await apiClient.get(`${DUMMYJSON_URL}/products?limit=100`);
  const products = Array.isArray(response.data?.products) ? response.data.products : [];
  return products.map(normalizeDummyProduct);
};

const fetchProductFromFakeStore = async (id) => {
  const response = await apiClient.get(`${FAKESTORE_URL}/products/${id}`);
  return response.data;
};

const fetchProductFromDummyJson = async (id) => {
  const response = await apiClient.get(`${DUMMYJSON_URL}/products/${id}`);
  return normalizeDummyProduct(response.data);
};

const fetchCategoriesFromFakeStore = async () => {
  const response = await apiClient.get(`${FAKESTORE_URL}/products/categories`);
  return response.data;
};

const fetchCategoriesFromDummyJson = async () => {
  const response = await apiClient.get(`${DUMMYJSON_URL}/products/category-list`);
  const categories = Array.isArray(response.data) ? response.data : [];
  return normalizeDummyCategories(categories);
};

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        return await fetchProductsFromFakeStore();
      } catch {
        try {
          return await fetchProductsFromDummyJson();
        } catch {
          throw new Error('Unable to load products. Please check your connection and try again.');
        }
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Fetch single product
export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');

      try {
        return await fetchProductFromFakeStore(id);
      } catch {
        try {
          return await fetchProductFromDummyJson(id);
        } catch {
          throw new Error('Unable to load product details right now.');
        }
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Fetch product categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        return await fetchCategoriesFromFakeStore();
      } catch {
        try {
          return await fetchCategoriesFromDummyJson();
        } catch {
          return [];
        }
      }
    },
    staleTime: 1000 * 60 * 10,
  });
};