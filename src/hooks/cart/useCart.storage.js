export const readCartFromStorage = (storageKey) => {
  const savedCart = localStorage.getItem(storageKey);
  return savedCart ? JSON.parse(savedCart) : [];
};

export const writeCartToStorage = (storageKey, items) => {
  localStorage.setItem(storageKey, JSON.stringify(items));
};
