import { getOrder } from "../orders/orderStore";
import { ledger } from "../ledger/ledger";

export interface SendRefundInput {
  orderId: string;
  amountCents: number;
  destinationAccountId: string;
}

export interface SendRefundResult {
  status: "refunded" | "rejected";
  reason?: string;
}

// TODO: this runs whenever the support agent's model decides to call the
// send_refund tool. orderId, amountCents, and destinationAccountId all
// come straight from the model's tool-call arguments — which means they
// can be influenced by anything in the conversation the model has seen,
// including text the customer wrote themselves. A customer message can
// try to talk the model into calling this tool with an inflated amount or
// a different destination account.
//
// Don't trust amountCents or destinationAccountId at face value. The order
// record (getOrder) is the source of truth for what's actually refundable
// and where it's allowed to go — validate the call against it before
// moving any money, and make sure a given order can't be refunded twice.
export async function sendRefund(input: SendRefundInput): Promise<SendRefundResult> {
  await ledger.credit(input.destinationAccountId, input.amountCents);
  return { status: "refunded" };
}
