import { ledger } from "../ledger/ledger";

export interface RefundRequestedEvent {
  eventId: string;
  accountId: string;
  amountCents: number;
}

export interface WebhookResult {
  status: "processed" | "already_processed";
}

// TODO: handle a `refund.requested` webhook event from the payment
// processor.
//
// The processor delivers webhooks at-least-once: the same eventId can
// arrive more than once — a normal retry when our 2xx response is slow or
// dropped, a redelivery after processor-side failover, or (rarely) two
// deliveries landing back-to-back close enough to be handled concurrently.
// Right now this handler credits the customer's ledger balance every time
// it's called, with no memory of which events it has already processed.
//
// Make this idempotent: no matter how many times handleRefundRequested is
// called for the same eventId — including two calls that overlap in time —
// the ledger must be credited exactly once for that event.
export async function handleRefundRequested(
  event: RefundRequestedEvent
): Promise<WebhookResult> {
  await ledger.credit(event.accountId, event.amountCents);
  return { status: "processed" };
}
