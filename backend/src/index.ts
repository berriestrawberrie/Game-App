import express from "express";
import { authenticateToken } from "./middleware/auth";
import type { AuthenticatedRequest } from "./middleware/auth";
import { PrismaClient } from "@prisma/client/extension";
import admin from "firebase-admin";
import { usersRoute } from "./routes/user";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/players", usersRoute);

app.listen(4000, () => console.log("Backend running on port 4000"));
