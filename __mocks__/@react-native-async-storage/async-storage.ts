let store: Record<string, string> = {};

export default {
  getItem: (key: string) => Promise.resolve(store[key]),
  setItem: (key: string, value: string) =>
    Promise.resolve((store[key] = value)),
  removeItem: (key: string) => Promise.resolve(delete store[key]),
  clear: () => Promise.resolve((store = {})),
  getAllKeys: () => Promise.resolve(Object.keys(store)),
};
