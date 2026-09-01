import { CartItem } from "@/types/cart";

// In a real app this would read from a context/store.
// For this challenge, it is mocked in the test suite.
export function useCart(): { items: CartItem[] } {
  return { items: [] };
}
