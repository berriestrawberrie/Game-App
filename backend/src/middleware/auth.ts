import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

// Extend Express Request type to include `user`
export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // attach user info to request
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Invalid token" });
  }
}
