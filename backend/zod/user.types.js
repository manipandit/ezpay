import { z } from "zod";

export const userSchema = z.object({
  username: z.string().email(),
  firstName: z.string().max(30),
  lastName: z.string().max(30),
  password: z.string().min(4),
});

export const updateSchema = z.object({
  firstName: z.string().max(20).optional(),
  lastName: z.string().max(20).optional(),
  password: z.string().min(6).optional(),
});
