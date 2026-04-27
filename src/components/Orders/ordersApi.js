const VALID_STATUSES = ["pending", "processing", "shipped", "delivered"];
const ORDERS_KEY = "bondok_shop_orders";

function readAllOrders() {
  const data = localStorage.getItem(ORDERS_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

function getStatusByOrderDate(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "processing";
  }

  const elapsedMs = Date.now() - date.getTime();
  const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);

  if (elapsedDays < 1) return "pending";
  if (elapsedDays < 3) return "processing";
  if (elapsedDays < 7) return "shipped";
  return "delivered";
}

function normalizeStatus(status, dateValue) {
  const current = String(status || "").toLowerCase();

  if (!VALID_STATUSES.includes(current)) {
    return getStatusByOrderDate(dateValue);
  }

  if (current === "delivered") {
    return "delivered";
  }

  return getStatusByOrderDate(dateValue);
}

function normalizeLocalOrder(order) {
  return {
    ...order,
    id: order?.id ?? order?.orderId,
    status: normalizeStatus(order?.status, order?.date),
    items: order?.items,
  };
}

function getLocalOrdersByUser(userId) {
  return readAllOrders()
    .filter((order) => String(order?.userId) === String(userId))
    .map(normalizeLocalOrder)
    .sort((a, b) => new Date(b?.date || 0) - new Date(a?.date || 0));
}

export async function getOrders(userId) {
  return getLocalOrdersByUser(userId);
}
