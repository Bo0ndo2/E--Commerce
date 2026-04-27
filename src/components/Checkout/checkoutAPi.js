const ORDERS_KEY = "bondok_shop_orders";

function readAllOrders() {
  const data = localStorage.getItem(ORDERS_KEY);

  if (!data) {
    return [];
  }

  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(ORDERS_KEY);
    return [];
  }
}

function writeAllOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function saveOrderLocally(order, userId) {
  const orders = readAllOrders();
  const normalizedOrder = {
    ...order,
    userId,
    date: order?.date || new Date().toISOString(),
  };

  orders.unshift(normalizedOrder);
  writeAllOrders(orders);
  return normalizedOrder;
}

export async function createOrderApi(order, userId) {
  return saveOrderLocally(order, userId);
}
