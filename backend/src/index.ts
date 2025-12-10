import express from "express";
import cors from "cors";
import { usersRoute } from "./routes/players";
import { gamesRoute } from "./routes/games";
import { scoresRoute } from "./routes/scores";

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
app.use("/games", gamesRoute);
app.use("/scores", scoresRoute);

app.listen(4000, () => console.log("Backend running on port 4000"));
