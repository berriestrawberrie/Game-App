import { Request, Response } from "express";
import { userSchema, userCreationSchema } from "../schemas/schemas";
import { PrismaClient } from "@prisma/client";
import { firebaseAdmin } from "../../config/firebase";
import admin from "firebase-admin";

const prisma = new PrismaClient();

// @desc: Creates a player in the db.
// @method: POST
// @body: UserCreationWithEmail
// @route /admins/
export const registerPlayer = async (req: Request, res: Response) => {
  try {
    console.log("Incoming body:", req.body);
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
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register player" });
  }
};
