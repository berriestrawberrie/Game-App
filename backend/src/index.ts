import express from "express";
import cors from "cors";
import { usersRoute } from "./routes/players";
import { gamesRoute } from "./routes/games";
import { scoresRoute } from "./routes/scores";
import { authenticateToken } from "./middleware/auth";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://game-app-frontend.onrender.com"],
  credentials: true,
};

// ✅ Global CORS
app.use(cors(corsOptions));

// ✅ Preflight for ALL routes (Express 5 requires this)
app.options("*", cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ✅ Protected routes
app.use("/players", authenticateToken, usersRoute);
app.use("/games", authenticateToken, gamesRoute);
app.use("/scores", authenticateToken, scoresRoute);

const PORT = 10000;
app.listen(PORT, () =>
  console.log(`Backend running on port this is updated: ${PORT}`)
);
