// service/domain/ai-agent/grocery-state.js
import { z } from "zod";
import { MessagesZodState } from "@langchain/langgraph";

/**
 * Grocery Shopping Agent State Schema
 *
 * Extends the base `MessagesZodState` with grocery shopping specific metadata
 * for tracking session context, caching, tool invocation, and shopping cart details.
 *
 * @typedef {Object} GroceryAgentState
 * @property {string} sessionId - Unique session ID for tracking the user's shopping session
 * @property {string} [result] - Optional result string, typically the agent's final response
 * @property {"hit" | "miss"} [cacheStatus] - Cache indicator showing if a cached result was used
 * @property {string} [toolUsed] - Name of the tool invoked by the agent during processing
 * @property {Array<Object>} [foundProducts] - Products found during search operations
 * @property {number} [cartTotal] - Current total value of items in the shopping cart
 * @property {string} [lastSearchQuery] - Last search query performed for context
 * @property {string} [recipeContext] - Current recipe being worked on (if any)
 */
export const GroceryAgentState = MessagesZodState.extend({
    sessionId: z.string(),
    result: z.string().optional(),
    cacheStatus: z.enum(["hit", "miss"]).optional(),
    toolsUsed: z.array(z.string()).optional(),
    foundProducts: z.array(z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        category: z.string().optional()
    })).optional(),
    cartTotal: z.number().optional(),
    lastSearchQuery: z.string().optional(),
    recipeContext: z.string().optional()
});