import express from "express";
import cors from "cors";
import { usersRoute } from "./routes/players";
import { gamesRoute } from "./routes/games";
import { scoresRoute } from "./routes/scores";
import { authenticateToken } from "./middleware/auth";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://gameapp-frontend.onrender.com"],
    credentials: true,
  })
);

// ✅ Preflight support for ALL routes
app.options("(.*)", cors());

// ✅ Preflight support for specific route groups
app.options("/players/(.*)", cors());
app.options("/games/(.*)", cors());
app.options("/scores/(.*)", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/players", authenticateToken, usersRoute);
app.use("/games", authenticateToken, gamesRoute);
app.use("/scores", authenticateToken, scoresRoute);

const PORT = 10000;
app.listen(PORT, () =>
  console.log(`Backend running on port this is updated: ${PORT}`)
);
