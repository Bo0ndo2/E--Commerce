import { useQuery } from '@tanstack/react-query';
import { fakeStoreApi } from '../lib/fakeStoreApi';

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fakeStoreApi.get('/products');
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
      const response = await fakeStoreApi.get(`/products/${id}`);
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
      const response = await fakeStoreApi.get('/products/categories');
      return response.data;
    },
  });
};