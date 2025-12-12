import type {
  UserScoreInterface,
  ScoreInterface,
} from "../interfaces/interfaces";

interface ScoreData extends ScoreInterface {
  id: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

export function sumDurationByGame(data: UserScoreInterface) {
  return data
    ? Object.values(
        data.scores.reduce<Record<string, { key: string; value: number }>>(
          (acc, score) => {
            const title = score.game.title;

            if (!acc[title]) {
              acc[title] = { key: title, value: 0 };
            }

            acc[title].value += score.durationMinutes;

            return acc;
          },
          {}
        )
      )
    : [];
}

export function getTop3GamesByDuration(scores: ScoreData[]) {
  // Aggregate total minutes per gameId
  const totals = scores.reduce((acc, score) => {
    acc[score.gameId] = (acc[score.gameId] || 0) + score.durationMinutes;
    return acc;
  }, {} as Record<number, number>);

  // Convert to array with game info
  const aggregated = Object.entries(totals).map(([gameId, totalMinutes]) => {
    const sample = scores.find((s) => s.gameId === Number(gameId));
    console.log(sample);
    return {
      gameId: Number(gameId),
      name:
        sample?.game?.title ??
        `${
          gameId === "1"
            ? "Chess"
            : gameId === "2"
            ? "Chance"
            : gameId === "3"
            ? "Puzzle"
            : "Ping"
        }`,
      totalMinutes: Number(totalMinutes),
    };
  });

  // Sort and return top 3
  return aggregated.sort((a, b) => b.totalMinutes - a.totalMinutes).slice(0, 3);
}
