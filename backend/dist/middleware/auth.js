"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
async function authenticateToken(req, res, next) {
    // ✅ Allow preflight requests through
    if (req.method === "OPTIONS") {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(token);
        req.user = decodedToken; // attach user info to request
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ error: "Invalid token" });
    }
}
