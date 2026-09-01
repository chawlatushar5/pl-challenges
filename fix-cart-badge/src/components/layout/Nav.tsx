export function Nav() {
  return (
    <nav className="flex gap-4 text-sm border-b border-stone-100 px-6 py-2 bg-stone-50">
      <a href="/products/all">All</a>
      <a href="/products/clothing">Clothing</a>
      <a href="/products/accessories">Accessories</a>
      <a href="/products/sale">Sale</a>
    </nav>
  );
}
