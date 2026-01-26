
export function getOrders(userId) {
  const data = localStorage.getItem(`orders_${userId}`);
  return data ? JSON.parse(data) : [];
}

export function createOrderApi(userId, order) {
  const orders = getOrders(userId);
  orders.unshift(order);
  localStorage.setItem(`orders_${userId}`, JSON.stringify(orders));
  return order;
}
