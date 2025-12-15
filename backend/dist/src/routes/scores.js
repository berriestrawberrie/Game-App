import { Router } from "express";
import { getGameScores, newGameScore } from "../controllers/scores";
export const scoresRoute = Router();
scoresRoute.get("/game/:gameId", getGameScores);
scoresRoute.post("/submit/:gameId/:userId", newGameScore);
