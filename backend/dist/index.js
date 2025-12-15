"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const players_1 = require("./routes/players");
const games_1 = require("./routes/games");
const scores_1 = require("./routes/scores");
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://gameapp-frontend.onrender.com"],
    credentials: true,
}));
// ✅ Preflight support for ALL routes
app.options("*", (0, cors_1.default)());
app.options("/players/*", (0, cors_1.default)());
app.options("/games/*", (0, cors_1.default)());
app.options("/scores/*", (0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Backend is running");
});
app.use("/players", auth_1.authenticateToken, players_1.usersRoute);
app.use("/games", auth_1.authenticateToken, games_1.gamesRoute);
app.use("/scores", auth_1.authenticateToken, scores_1.scoresRoute);
const PORT = 10000;
app.listen(PORT, () => console.log(`Backend running on port this is updated: ${PORT}`));
