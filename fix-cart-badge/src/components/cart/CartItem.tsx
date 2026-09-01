import { CartItem as CartItemType } from "@/types/cart";

interface Props {
  item: CartItemType;
}

export function CartItem({ item }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-stone-100 rounded" />
      <div className="flex-1">
        <p className="text-sm font-medium">{item.name}</p>
        <p className="text-xs text-stone-400">${item.price} × {item.quantity}</p>
      </div>
      <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
}
