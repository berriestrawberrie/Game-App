/**
 * Database seed script.
 * Inserts sample users, games, and sessions for testing.
 *
 * Run with:
 *   npm run prisma:seed
 *
 * Backend team:
 * - Use this to prefill DB with sample data for demo/testing.
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    console.log("Seeding test data...");
    // Clear existing data to avoid duplicates
    await prisma.score.deleteMany();
    await prisma.user.deleteMany();
    await prisma.game.deleteMany();
    // --- Users ---
    const user1 = await prisma.user.create({
        data: {
            email: "donald@email.com",
            firstName: "Ronald",
            lastName: "McDonald",
            firebaseId: "jilGazwyyvOzUpQsUVDSGfPPlb12",
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: "debbi@email.com",
            firstName: "Debbie",
            lastName: "Cakes",
            firebaseId: "h7Fj8jxwIVgSkmgQPk51iHNS25t2",
        },
    });
    const user3 = await prisma.user.create({
        data: {
            email: "bunny@email.com",
            firstName: "Bunny",
            lastName: "Rabbit",
            firebaseId: "xWkwIcZQjtUKTMPDK0aNJOGFKQ22",
        },
    });
    const user4 = await prisma.user.create({
        data: {
            email: "milk@email.com",
            firstName: "Milk",
            lastName: "Toast",
            firebaseId: "XqTLsDTHR8cvYPepK3LNkx3j58s2",
        },
    });
    // --- Games ---
    const game1 = await prisma.game.create({
        data: {
            title: "Chess",
            description: "A strategic board game where two players battle to checkmate the opponent’s king",
        },
    });
    const game2 = await prisma.game.create({
        data: {
            title: "Chance",
            description: "A luck‑driven game where outcomes depend on dice rolls or random draws.",
        },
    });
    const game3 = await prisma.game.create({
        data: {
            title: "Puzzle",
            description: "A problem‑solving game that challenges players to arrange, match, or decode pieces into order.",
        },
    });
    const game4 = await prisma.game.create({
        data: {
            title: "Ping",
            description: "A classic arcade game simulating table tennis with paddles bouncing a ball back and forth.",
        },
    });
    const now = new Date();
    // --- Scores ---
    await prisma.score.createMany({
        data: [
            {
                userId: user1.id,
                gameId: game1.id,
                startedAt: now,
                stoppedAt: new Date(now.getTime() + 20 * 60000), // 20 minutes later
                durationMinutes: 20,
            },
            {
                userId: user2.id,
                gameId: game2.id,
                startedAt: now,
                stoppedAt: new Date(now.getTime() + 15 * 60000),
                durationMinutes: 15,
            },
            {
                userId: user3.id,
                gameId: game3.id,
                startedAt: now,
                stoppedAt: new Date(now.getTime() + 25 * 60000),
                durationMinutes: 25,
            },
            {
                userId: user4.id,
                gameId: game4.id,
                startedAt: now,
                stoppedAt: new Date(now.getTime() + 30 * 60000),
                durationMinutes: 30,
            },
            {
                userId: user1.id,
                gameId: game2.id,
                startedAt: new Date("2025-10-17T14:00:00Z"),
                stoppedAt: new Date("2025-10-17T14:18:00Z"),
                durationMinutes: 18,
            },
        ],
    });
    console.log("Seeding complete!");
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
