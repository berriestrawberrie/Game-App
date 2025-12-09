import { Router } from "express";
import {
  registerPlayer,
  loginPlayer,
  getUserScores,
  getAllUsers,
} from "../controllers/players";

export const usersRoute = Router();

usersRoute.post("/register", registerPlayer);
usersRoute.get("/myaccount", loginPlayer);
usersRoute.get("/scores", getUserScores);
usersRoute.get("/users", getAllUsers);
