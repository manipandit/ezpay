import { z } from "zod";

export const toAccountSchema = z.object({
  to: z.string(),
  amount: z.number(),
});
