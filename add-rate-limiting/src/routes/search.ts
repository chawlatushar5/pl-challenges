import { Router } from "express";
import { rateLimitMiddleware } from "../middleware/rateLimit";

export const searchRouter = Router();

// Apply rate limiting to all search requests.
searchRouter.use(rateLimitMiddleware);

searchRouter.get("/", (req, res) => {
  const q = req.query.q as string | undefined;
  if (!q) return res.status(400).json({ error: "q is required" });

  // Fake search results
  res.json({
    query: q,
    results: [
      { id: "1", title: `Result for "${q}" #1` },
      { id: "2", title: `Result for "${q}" #2` },
    ],
  });
});
