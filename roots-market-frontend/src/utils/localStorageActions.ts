export const loadFromLocalStorage = <T>(key: string, defaultValue: T) => {
  const storageValue = localStorage.getItem(key);
  return storageValue ? JSON.parse(storageValue) : defaultValue;
}

export const saveToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
}
