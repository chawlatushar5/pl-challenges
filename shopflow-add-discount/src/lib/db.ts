// Placeholder db client — the real project wires this up to Prisma.
// Not used by the test suite; present for realism when browsing the codebase.
export const db = {
  product: {
    findMany: async (..._args: unknown[]) => [],
    findUnique: async (..._args: unknown[]) => null,
    create: async (..._args: unknown[]) => null,
  },
};
