import { Router } from "express";
import { getAllGames } from "../controllers/games";
export const gamesRoute = Router();
gamesRoute.get("/selectgames", getAllGames);
