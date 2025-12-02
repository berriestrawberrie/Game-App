import { Router } from "express";
import { registerPlayer } from "../controllers/users";

export const usersRoute = Router();

usersRoute.post("/register", registerPlayer);
