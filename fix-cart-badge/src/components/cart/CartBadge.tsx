import { useCart } from "@/hooks/useCart";

export function CartBadge() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (count === 0) return null;

  return (
    <span
      data-testid="cart-badge"
      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
    >
      {items.length}
    </span>
  );
}
