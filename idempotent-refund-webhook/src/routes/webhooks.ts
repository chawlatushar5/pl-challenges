import { Router } from "express";
import { handleRefundRequested } from "../webhooks/paymentEvents";
import { handleOrderEvent } from "../webhooks/orderEvents";

export const webhooksRouter = Router();

webhooksRouter.post("/payment-events", async (req, res) => {
  const body = req.body;
  if (body?.type !== "refund.requested") {
    return res.status(400).json({ error: "unsupported event type" });
  }
  const result = await handleRefundRequested({
    eventId: body.eventId,
    accountId: body.accountId,
    amountCents: body.amountCents,
  });
  res.json(result);
});

webhooksRouter.post("/order-events", async (req, res) => {
  const body = req.body;
  const result = await handleOrderEvent(body);
  res.json(result);
});
