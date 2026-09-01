// In-memory account ledger — stands in for the real payments ledger.
class Ledger {
  private balances = new Map<string, number>();
  private creditCount = new Map<string, number>();

  async credit(accountId: string, amountCents: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5));
    this.balances.set(accountId, (this.balances.get(accountId) ?? 0) + amountCents);
    this.creditCount.set(accountId, (this.creditCount.get(accountId) ?? 0) + 1);
  }

  getBalance(accountId: string): number {
    return this.balances.get(accountId) ?? 0;
  }

  getCreditCount(accountId: string): number {
    return this.creditCount.get(accountId) ?? 0;
  }

  reset(): void {
    this.balances.clear();
    this.creditCount.clear();
  }
}

export const ledger = new Ledger();
