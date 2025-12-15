"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newGameScore = exports.getAllScores = exports.getGameScores = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getGameScores = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const { gameId } = req.params;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }
        const scores = await prisma.score.findMany({
            where: { gameId: Number(gameId) },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        if (!scores)
            return res.status(404).json({ error: "scores not found for this game" });
        res.status(200).json(scores);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch scores for this game" });
        console.log(error);
    }
};
exports.getGameScores = getGameScores;
const getAllScores = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }
        const scores = await prisma.score.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        if (!scores)
            return res.status(404).json({ error: "scores not found for this game" });
        res.status(200).json(scores);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch scores for this game" });
        console.log(error);
    }
};
exports.getAllScores = getAllScores;
const newGameScore = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const gameId = Number(req.params.gameId);
        const userId = Number(req.params.userId);
        const durationMinutes = req.body.durationMinutes;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }
        const startedAt = new Date();
        const stoppedAt = new Date(startedAt.getTime() + durationMinutes * 60000);
        const score = await prisma.score.create({
            data: {
                userId,
                gameId,
                startedAt,
                stoppedAt,
                durationMinutes,
            },
        });
        res.status(200).json(score);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to record score for this player" });
        console.log(error);
    }
};
exports.newGameScore = newGameScore;
