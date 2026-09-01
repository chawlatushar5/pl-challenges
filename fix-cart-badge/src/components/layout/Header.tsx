import { CartIcon } from "@/components/cart/CartIcon";

// Header renders the cart icon which contains CartBadge.
// The badge count logic is in CartBadge.tsx — not here.
export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
      <span className="font-bold text-lg">ShopCart</span>
      <nav className="flex items-center gap-6 text-sm text-stone-600">
        <a href="/products">Products</a>
        <a href="/orders">Orders</a>
        <CartIcon />
      </nav>
    </header>
  );
}
