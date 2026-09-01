import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";

interface Props {
  open: boolean;
  onClose: () => void;
}

// Slide-in cart drawer — shows line items and subtotal.
// Count display is handled by CartBadge in the header, not here.
export function CartDrawer({ open, onClose }: Props) {
  const { items } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="w-80 bg-white shadow-xl flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Your cart</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">✕</button>
        </div>
        <div className="flex-1 overflow-auto p-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <p className="text-stone-400 text-sm text-center mt-8">Your cart is empty</p>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between text-sm font-semibold mb-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button className="w-full bg-amber-600 text-white py-2 rounded font-medium">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
