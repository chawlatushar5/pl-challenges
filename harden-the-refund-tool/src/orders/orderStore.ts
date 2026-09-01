// In-memory order records — stands in for the real orders DB. This is the
// one source of truth for what an order is actually allowed to refund, and
// to which account. Nothing about a tool call's arguments should be
// trusted over what's recorded here.
export interface Order {
  orderId: string;
  accountId: string;
  refundableCents: number;
  status: "paid" | "refunded" | "cancelled";
}

const orders = new Map<string, Order>([
  ["order_1001", { orderId: "order_1001", accountId: "acct_amy", refundableCents: 4200, status: "paid" }],
  ["order_1002", { orderId: "order_1002", accountId: "acct_ben", refundableCents: 1500, status: "paid" }],
  ["order_1003", { orderId: "order_1003", accountId: "acct_cara", refundableCents: 0, status: "refunded" }],
]);

export function getOrder(orderId: string): Order | undefined {
  return orders.get(orderId);
}

// Test helper: reset an order back to its seeded state between tests.
export function resetOrder(orderId: string, order: Order): void {
  orders.set(orderId, { ...order });
}
