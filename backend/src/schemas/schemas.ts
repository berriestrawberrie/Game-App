import { z } from "zod";

// User schema
export const userSchema = z.object({
  email: z.string().email(),
  firebaseId: z.string(),
  firstName: z.string().min(3, "First name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last name must be at least 3 characters long"),
  avatarUrl: z.string().optional(),
});

export const userCreationSchema = userSchema.extend({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

// Game schema
export const GameSchema = z.object({
  title: z.string().min(3, "Game title must be at least 3 characters long"),
  description: z.string().optional(),
});

// Score schema
export const ScoreSchema = z.object({
  userId: z.number().int(), // relation handled by Prisma
  gameId: z.number().int(),
  startedAt: z.date(),
  stoppedAt: z.date().optional(),
  durationMinutes: z.number().int().optional(),
});
