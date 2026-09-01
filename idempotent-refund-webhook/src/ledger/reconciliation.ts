// Nightly reconciliation report — sums ledger activity for finance. Reads
// the ledger, never writes to it, so it can't be the source of a
// double-credit bug. Included for realism; not the file with the bug.
import { ledger } from "./ledger";

export function reportBalance(accountId: string): { accountId: string; balanceCents: number } {
  return { accountId, balanceCents: ledger.getBalance(accountId) };
}
