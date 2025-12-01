import express from "express";
import { authenticateToken } from "./middleware/auth.js";
const app = express();
app.use(express.json());
app.get("/profile", authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user?.email}` });
});
app.listen(4000, () => console.log("Backend running on port 4000"));
