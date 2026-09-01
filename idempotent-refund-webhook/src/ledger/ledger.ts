// In-memory account ledger. In production this would be a real ledger
// service/DB — kept in-memory here so the challenge sandbox needs no
// external services. credit() is deliberately async (a real ledger write
// always crosses the network) so it behaves like real I/O with a real gap
// where two callers can interleave.
class Ledger {
  private balances = new Map<string, number>();

  async credit(accountId: string, amountCents: number): Promise<void> {
    // Simulates a real network round-trip to a ledger service.
    await new Promise((resolve) => setTimeout(resolve, 5));
    const current = this.balances.get(accountId) ?? 0;
    this.balances.set(accountId, current + amountCents);
  }

  getBalance(accountId: string): number {
    return this.balances.get(accountId) ?? 0;
  }

  // Test helper.
  reset(): void {
    this.balances.clear();
  }
}

export const ledger = new Ledger();
