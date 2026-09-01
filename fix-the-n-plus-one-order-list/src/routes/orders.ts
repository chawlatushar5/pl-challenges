import { Router } from "express";
import { getDb } from "../db/database";

export const ordersRouter = Router();

interface OrderItem {
  sku: string;
  quantity: number;
}

interface OrderWithItems {
  id: number;
  customerName: string;
  placedAt: string;
  items: OrderItem[];
}

// TODO: this is correct — it returns every order with its line items — but
// it fetches each order's items with a separate query issued inside the
// loop. That's fine at 8 seeded orders; against the real orders table this
// is one query per order on every page load. Fix it to fetch all the
// items needed for the current page of orders in one query instead of one
// query per order.
async function listOrdersWithItems(): Promise<OrderWithItems[]> {
  const db = await getDb();

  const orderStmt = db.prepare("SELECT id, customer_name, placed_at FROM orders ORDER BY id");
  const orders: OrderWithItems[] = [];
  while (orderStmt.step()) {
    const row = orderStmt.getAsObject() as { id: number; customer_name: string; placed_at: string };
    orders.push({ id: row.id, customerName: row.customer_name, placedAt: row.placed_at, items: [] });
  }
  orderStmt.free();

  for (const order of orders) {
    const itemStmt = db.prepare("SELECT sku, quantity FROM order_items WHERE order_id = ?", [order.id]);
    while (itemStmt.step()) {
      const row = itemStmt.getAsObject() as { sku: string; quantity: number };
      order.items.push({ sku: row.sku, quantity: row.quantity });
    }
    itemStmt.free();
  }

  return orders;
}

ordersRouter.get("/", async (_req, res) => {
  const orders = await listOrdersWithItems();
  res.json({ orders });
});
