// Takes a tool-call object as returned by the model (name + arguments) and
// invokes the matching handler from the registry. This is the mechanism by
// which whatever the model decided to pass as arguments — including
// anything it picked up from the customer's own message — reaches a tool
// handler's input unmodified. Shown for context; the fix belongs in the
// tool handler itself (src/tools/sendRefund.ts), not here — dispatch has
// no way to know which arguments are safe for a given tool, only the tool
// does.
import { toolRegistry } from "../tools/toolRegistry";

export interface ModelToolCall {
  toolName: string;
  arguments: unknown;
}

export async function dispatchToolCall(call: ModelToolCall): Promise<unknown> {
  const tool = toolRegistry.find((t) => t.name === call.toolName);
  if (!tool) throw new Error(`Unknown tool: ${call.toolName}`);
  return tool.handler(call.arguments);
}
