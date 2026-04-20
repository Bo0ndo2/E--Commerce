import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrderApi, getOrdersApi } from "../components/Checkout/checkoutAPi";

const getOrdersQueryKey = (userId) => ["orders", userId || "guest"];

export const useOrders = (userId) => {
  return useQuery({
    queryKey: getOrdersQueryKey(userId),
    queryFn: () => getOrdersApi(userId),
    initialData: [],
  });
};

export const useCreateOrder = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order) => createOrderApi(order, userId),
    onSuccess: (createdOrder) => {
      queryClient.setQueryData(getOrdersQueryKey(userId), (current = []) => [
        createdOrder,
        ...current,
      ]);
    },
  });
};