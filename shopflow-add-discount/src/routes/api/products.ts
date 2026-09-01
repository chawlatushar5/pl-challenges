import { db } from "@/lib/db";

export async function listProducts(categoryId?: string) {
  return db.product.findMany({
    where: categoryId ? { categoryId } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getProduct(id: string) {
  return db.product.findUnique({ where: { id } });
}

export async function createProduct(data: { name: string; price: number; categoryId: string }) {
  return db.product.create({ data });
}
