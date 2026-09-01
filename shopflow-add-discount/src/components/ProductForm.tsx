import { useState } from "react";

interface Props {
  onSubmit: (data: { name: string; price: number; categoryId: string }) => void;
}

export function ProductForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");

  function handleSubmit() {
    onSubmit({ name, price, categoryId });
  }

  return (
    <form className="product-form">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        placeholder="Price"
      />
      <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category" />
      <button type="button" onClick={handleSubmit}>
        Save product
      </button>
    </form>
  );
}
