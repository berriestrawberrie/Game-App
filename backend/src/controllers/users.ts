import { Request, Response } from "express";
import admin from "firebase-admin";
import { userSchema, userCreationSchema } from "../schemas/schemas";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

// @desc: Creates a player in the db.
// @method: POST
// @body: UserCreationWithEmail
// @route /admins/
export const registerPlayer = async (req: Request, res: Response) => {
  let firebaseUser: admin.auth.UserRecord | null = null;
  try {
    const validatedUser = userCreationSchema.safeParse(req.body);
    if (!validatedUser.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validatedUser.error,
      });
    }

    const { firstName, lastName, email, avatarUrl, password } =
      validatedUser.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Plaer already exists" });
    }

    firebaseUser = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });

    const user = await prisma.user.create({
      data: {
        firebaseId: firebaseUser.uid,
        email,
        firstName,
        lastName,
        avatarUrl,
      },
    });

    res.status(201).json({ message: "Player created successfully", user });
  } catch (error) {
    if (firebaseUser && firebaseUser.uid) {
      try {
        await admin.auth().deleteUser(firebaseUser.uid);
        console.log("Rolled back Firebase user creation");
      } catch (rollbackError) {
        console.error("Failed to rollback Firebase user:", rollbackError);
      }
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to create player" });
  }
};
