import { Router } from "express";
import {
  getGameScores,
  newGameScore,
  getAllScores,
} from "../controllers/scores";

export const scoresRoute = Router();

scoresRoute.get("/game/:gameId", getGameScores);
scoresRoute.post("/submit/:gameId/:userId", newGameScore);
scoresRoute.get("/all", getAllScores);
