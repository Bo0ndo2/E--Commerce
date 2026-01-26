import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://fakestoreapi.com';

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    },
  });
};

// Fetch single product
export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Fetch product categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/products/categories`);
      return response.data;
    },
  });
};