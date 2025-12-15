"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoresRoute = void 0;
const express_1 = require("express");
const scores_1 = require("../controllers/scores");
exports.scoresRoute = (0, express_1.Router)();
exports.scoresRoute.get("/game/:gameId", scores_1.getGameScores);
exports.scoresRoute.post("/submit/:gameId/:userId", scores_1.newGameScore);
