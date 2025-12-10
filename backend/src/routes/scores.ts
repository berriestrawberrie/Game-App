import { Router } from "express";
import { getGameScores } from "../controllers/scores";

export const scoresRoute = Router();

scoresRoute.get("/game/:gameId", getGameScores);
