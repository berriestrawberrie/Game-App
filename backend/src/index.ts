import express from "express";
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import { usersRoute } from "./routes/players";
import { gamesRoute } from "./routes/games";
import { scoresRoute } from "./routes/scores";
import { authenticateToken } from "./middleware/auth";
import logger from "./utils/logger";
console.log("NODE_ENV:", process.env.NODE_ENV);
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://game-app-frontend.onrender.com"],
  credentials: true,
};

// Global CORS (handles ALL preflight automatically in Express 5)
app.use(cors(corsOptions));

app.use(express.json());
//WINSTON LOGGER:
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Protected routes
app.use("/players", authenticateToken, usersRoute);
app.use("/games", authenticateToken, gamesRoute);
app.use("/scores", authenticateToken, scoresRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({ error: "Internal server error" });
});

const PORT = 10000;
app.listen(PORT, () =>
  console.log(`Backend running on port this is updated: ${PORT}`)
);
