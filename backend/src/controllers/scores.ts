import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGameScores = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scores for this game" });
    console.log(error);
  }
};
export const getAllScores = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const scores = await prisma.score.findMany();

    if (!scores)
      return res.status(404).json({ error: "scores not found for this game" });
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scores for this game" });
    console.log(error);
  }
};

export const newGameScore = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to record score for this player" });
    console.log(error);
  }
};
