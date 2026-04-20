const ORDERS_KEY_PREFIX = "bondok_shop_orders";
const LEGACY_ORDERS_KEY = "bondok_shop_orders";

const getOrdersStorageKey = (userId) =>
  `${ORDERS_KEY_PREFIX}_${userId || "guest"}`;

export async function getOrdersApi(userId) {
  const scopedKey = getOrdersStorageKey(userId);
  const scopedOrders = localStorage.getItem(scopedKey);

  if (scopedOrders) {
    return JSON.parse(scopedOrders);
  }

  const legacyOrders = localStorage.getItem(LEGACY_ORDERS_KEY);
  if (!legacyOrders) {
    return [];
  }

  const parsedLegacyOrders = JSON.parse(legacyOrders);
  localStorage.setItem(scopedKey, JSON.stringify(parsedLegacyOrders));

  return parsedLegacyOrders;
}

export async function createOrderApi(order, userId) {
  const currentOrders = await getOrdersApi(userId);
  const updatedOrders = [order, ...currentOrders];

  localStorage.setItem(
    getOrdersStorageKey(userId),
    JSON.stringify(updatedOrders),
  );

  return order;
}
