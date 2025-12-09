import { Request, Response } from "express";
import { userCreationSchema } from "../schemas/schemas";
import { PrismaClient } from "@prisma/client";
import { firebaseAdmin } from "../../config/firebase";

const prisma = new PrismaClient();

export const registerPlayer = async (req: Request, res: Response) => {
  try {
    const validatedUser = userCreationSchema.safeParse(req.body);
    if (!validatedUser.success) {
      return res.status(400).json({
        error: "Validation failed on request",
        details: validatedUser.error,
      });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);

    // Check if user already exists in Prisma
    let user = await prisma.user.findUnique({
      where: { firebaseId: decoded.uid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseId: decoded.uid,
          email: decoded.email!,
          firstName: validatedUser.data.firstName,
          lastName: validatedUser.data.lastName,
          avatarUrl: validatedUser.data.avatarUrl,
        },
      });
    }

    res.status(201).json({ message: "Player registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register player" });
  }
};

export const loginPlayer = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);

    const user = await prisma.user.findUnique({
      where: { firebaseId: decoded.uid },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found in Prisma" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
    console.log(error);
  }
};

export const getUserScores = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);

    const user = await prisma.user.findUnique({
      where: { firebaseId: decoded.uid },
      include: {
        scores: {
          include: { game: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user scores" });
    console.log(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      return res.status(404).json({ error: "No students found", users: [] });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};
