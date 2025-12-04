import { Router } from "express";
import { registerPlayer, loginPlayer } from "../controllers/players";

export const usersRoute = Router();

usersRoute.post("/register", registerPlayer);
usersRoute.get("/myaccount", loginPlayer);
