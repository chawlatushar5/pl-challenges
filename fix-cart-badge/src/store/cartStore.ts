import { CartItem } from "@/types/cart";

// Simple in-memory cart store.
// In production this would use Zustand or Context.
let _items: CartItem[] = [];

export const cartStore = {
  getItems: () => _items,
  addItem: (item: CartItem) => {
    const existing = _items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      _items = [..._items, item];
    }
  },
  removeItem: (id: string) => {
    _items = _items.filter((i) => i.id !== id);
  },
  clear: () => {
    _items = [];
  },
};
