// Redis client — reads connection URL from environment.
// Do not hardcode credentials here or anywhere else.
//
// In production: REDIS_URL is set in the deployment environment.
// In tests: this module is mocked — no real Redis connection is made.

export interface RedisStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  expire(key: string, seconds: number): Promise<void>;
  incr(key: string): Promise<number>;
}

// Minimal in-memory store used when REDIS_URL is not available (e.g. tests).
// In production this should be replaced with a real Redis client.
class InMemoryStore implements RedisStore {
  private data = new Map<string, { value: string; expiresAt?: number }>();

  async get(key: string): Promise<string | null> {
    const entry = this.data.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.data.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string): Promise<void> {
    this.data.set(key, { value });
  }

  async expire(key: string, seconds: number): Promise<void> {
    const entry = this.data.get(key);
    if (entry) entry.expiresAt = Date.now() + seconds * 1000;
  }

  async incr(key: string): Promise<number> {
    const current = await this.get(key);
    const next = (parseInt(current ?? "0") + 1).toString();
    const entry = this.data.get(key);
    this.data.set(key, { value: next, expiresAt: entry?.expiresAt });
    return parseInt(next);
  }

  // Test helper: reset all keys
  flush(): void {
    this.data.clear();
  }
}

export const redisStore: RedisStore & { flush?: () => void } = new InMemoryStore();
