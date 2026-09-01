// Registers every tool the support agent can call, and the JSON schema
// describing its arguments to the model. Context for how sendRefund gets
// invoked — not the file with the bug.
import { getOrder } from "../orders/orderStore";
import { sendRefund } from "./sendRefund";

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  handler: (input: unknown) => Promise<unknown>;
}

export const toolRegistry: ToolDefinition[] = [
  {
    name: "lookup_order",
    description: "Look up an order's status and refundable balance.",
    parameters: { orderId: "string" },
    handler: async (input) => getOrder((input as { orderId: string }).orderId) ?? { error: "not found" },
  },
  {
    name: "send_refund",
    description: "Refund an order to the customer's account on file.",
    parameters: { orderId: "string", amountCents: "number", destinationAccountId: "string" },
    handler: async (input) => sendRefund(input as Parameters<typeof sendRefund>[0]),
  },
];
