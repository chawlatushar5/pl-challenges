interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export function ProductCard({ id, name, price }: Props) {
  return (
    <div className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square bg-stone-100" />
      <div className="p-4">
        <h3 className="font-medium text-stone-900">{name}</h3>
        <p className="text-stone-500 text-sm mt-1">${price.toFixed(2)}</p>
        <button className="mt-3 w-full bg-amber-600 text-white py-1.5 rounded text-sm font-medium">
          Add to cart
        </button>
      </div>
    </div>
  );
}
