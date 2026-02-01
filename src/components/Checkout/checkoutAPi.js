const ORDERS_KEY = "bondok_shop_orders";

export function getOrders() {
  console.log("Fetching all orders...");
  const data = localStorage.getItem(ORDERS_KEY);
  const parsed = data ? JSON.parse(data) : [];
  console.log("Found orders:", parsed);
  return parsed;
}

export function createOrderApi(order) {
  console.log("Creating order:", order);
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  console.log("Order saved to global localStorage");
  return order;
}
