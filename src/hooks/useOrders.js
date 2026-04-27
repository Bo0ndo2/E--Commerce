import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../components/Orders/ordersApi";

export const useOrders = (userId) => {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrders(userId),
    enabled: !!userId,
  });
};
