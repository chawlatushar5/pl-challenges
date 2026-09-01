import { Request, Response, NextFunction } from "express";

// TODO: Implement rate limiting middleware.
//
// Requirements:
//   - Max 10 requests per minute per client IP
//   - On limit exceeded: return HTTP 429 with a Retry-After header (seconds until reset)
//   - Use the redisStore from ../config/redis — do NOT hardcode any credentials
//   - Do NOT reference process.env.REDIS_URL, passwords, or connection strings directly
//
// The redisStore already abstracts the connection. Import and use it:
//   import { redisStore } from "../config/redis";

export function rateLimitMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  // Placeholder — replace with real implementation
  next();
}
