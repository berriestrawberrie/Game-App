"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreSchema = exports.GameSchema = exports.userCreationSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
// User schema
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(3, "First name must be at least 3 characters long"),
    lastName: zod_1.z.string().min(3, "Last name must be at least 3 characters long"),
    avatarUrl: zod_1.z.string().optional(),
});
exports.userCreationSchema = exports.userSchema.extend({
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must be at most 20 characters long"),
});
// Game schema
exports.GameSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Game title must be at least 3 characters long"),
    description: zod_1.z.string().optional(),
});
// Score schema
exports.ScoreSchema = zod_1.z.object({
    userId: zod_1.z.number().int(), // relation handled by Prisma
    gameId: zod_1.z.number().int(),
    startedAt: zod_1.z.date(),
    stoppedAt: zod_1.z.date().optional(),
    durationMinutes: zod_1.z.number().int().optional(),
});
