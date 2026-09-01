export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  createdAt: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  price: number;
}
