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

app.options("*", cors()); // preflight support

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/players", authenticateToken, usersRoute);
app.use("/games", authenticateToken, gamesRoute);
app.use("/scores", authenticateToken, scoresRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Backend running on port 4000"));
