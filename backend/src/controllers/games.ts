import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany();
    if (games.length === 0) {
      return res.status(404).json({ error: "No games found", games: [] });
    }
    return res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching Games:", error);
    res.status(500).json({ error: "Failed to fetch games" });
  }
};
