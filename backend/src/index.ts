import express from "express";
import cors from "cors";
import { authenticateToken } from "./middleware/auth";
import type { AuthenticatedRequest } from "./middleware/auth";
import { PrismaClient } from "@prisma/client";
import { usersRoute } from "./routes/players";

const prisma = new PrismaClient();
const app = express();
// Allow requests from your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // React dev server
    credentials: true, // if you send cookies/auth headers
  })
);

app.use(express.json());

app.use("/players", usersRoute);

app.listen(4000, () => console.log("Backend running on port 4000"));
