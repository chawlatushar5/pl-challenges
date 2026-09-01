// Handles `order.shipped` / `order.cancelled` webhook events. Unrelated to
// the refund-processing bug — this project has more than one webhook
// handler, and only one of them is broken.
export interface OrderEvent {
  eventId: string;
  orderId: string;
  type: "order.shipped" | "order.cancelled";
}

const seenOrderEvents = new Set<string>();

export async function handleOrderEvent(event: OrderEvent): Promise<{ status: string }> {
  if (seenOrderEvents.has(event.eventId)) {
    return { status: "already_processed" };
  }
  seenOrderEvents.add(event.eventId);
  // ... update shipment/cancellation state (not modeled here)
  return { status: "processed" };
}
