import { Router, Response } from "express";
import { PrismaClient } from "@prisma/client/extension";
import {
  authenticateToken,
  AuthenticatedRequest,
} from "../middleware/authenticateToken";

const prisma = new PrismaClient();
const router = Router();

// Protected signup route
router.post(
  "/signup",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { uid, email } = req.user!; // Firebase UID + email

      let user = await prisma.user.findUnique({
        where: { firebaseUid: uid },
      });

      if (!user) {
        user = await prisma.user.create({
          data: { firebaseUid: uid, email },
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create or fetch user" });
    }
  }
);

export default router;
