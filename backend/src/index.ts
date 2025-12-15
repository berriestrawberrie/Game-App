import express from "express";
import cors from "cors";
import { usersRoute } from "./routes/players";
import { gamesRoute } from "./routes/games";
import { scoresRoute } from "./routes/scores";
import { authenticateToken } from "./middleware/auth";

const app = express();
// Allow requests from your frontend origin
app.use(
  cors({
    origin: ["http://localhost:5173", "https://gameapp-frontend.onrender.com/"], // React dev server & prod
    credentials: true, // if you send cookies/auth headers
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/players", authenticateToken, usersRoute);
app.use("/games", authenticateToken, gamesRoute);
app.use("/scores", authenticateToken, scoresRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Backend running on port 4000"));
