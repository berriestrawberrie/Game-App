"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesRoute = void 0;
const express_1 = require("express");
const games_1 = require("../controllers/games");
exports.gamesRoute = (0, express_1.Router)();
exports.gamesRoute.get("/selectgames", games_1.getAllGames);
