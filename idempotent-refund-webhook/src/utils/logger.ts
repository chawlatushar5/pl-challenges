/* eslint-disable no-console */
export const logger = {
  info: (msg: string, meta?: Record<string, unknown>) => console.log(`[info] ${msg}`, meta ?? ""),
  error: (msg: string, meta?: Record<string, unknown>) => console.error(`[error] ${msg}`, meta ?? ""),
};
