import { Router } from "express";
import { registerPlayer } from "../controllers/players";

export const usersRoute = Router();

usersRoute.post("/register", registerPlayer);
