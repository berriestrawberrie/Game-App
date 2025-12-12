import type {
  UserScoreInterface,
  ScoreInterface,
} from "../interfaces/interfaces";

interface ScoreData extends ScoreInterface {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

type GroupedScores = Record<
  string,
  {
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
    scores: ScoreData[];
  }
>;

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

export function getTop3Players(scores: ScoreData[]) {
  // Group scores by user email
  const grouped = scores.reduce<GroupedScores>((acc, score) => {
    const email = score.user.email!; // email is required

    if (!acc[email]) {
      acc[email] = {
        user: score.user,
        scores: [],
      };
    }

    acc[email].scores.push(score);
    return acc;
  }, {});

  // Convert grouped object → array with totalDuration
  const playersWithTotals = Object.values(grouped).map((player) => {
    const totalDuration = player.scores.reduce(
      (sum, s) => sum + (s.durationMinutes ?? 0),
      0
    );

    return {
      firstName: player.user.firstName,
      lastName: player.user.lastName,
      totalDuration,
    };
  });

  // Sort by totalDuration DESC and take top 3
  const top3 = playersWithTotals
    .sort((a, b) => b.totalDuration - a.totalDuration)
    .slice(0, 3);

  return top3;
}

export function getAverageDurationPerGame(scores: ScoreData[]) {
  // gameId -> array of durations
  const grouped = scores.reduce<Record<number, number[]>>((acc, score) => {
    if (!acc[score.gameId]) {
      acc[score.gameId] = [];
    }

    acc[score.gameId].push(score.durationMinutes);
    return acc;
  }, {});

  // Convert to averages
  const result = Object.entries(grouped).map(([gameId, durations]) => {
    const total = durations.reduce((sum, d) => sum + d, 0);
    const avg = total / durations.length;

    return {
      gameId: `${
        gameId === "1"
          ? "Chess"
          : gameId === "2"
          ? "Chance"
          : gameId === "3"
          ? "Puzzle"
          : "Ping"
      }`,
      averageDuration: avg,
    };
  });

  return result;
}

export function getTotalDurationPerDay(scores: ScoreData[]) {
  const grouped = scores.reduce<Record<string, number>>((acc, score) => {
    // Extract date only (YYYY-MM-DD)
    const date = new Date(score.startedAt).toISOString().split("T")[0];

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date] += score.durationMinutes;
    return acc;
  }, {});

  // Convert to array for Recharts
  return Object.entries(grouped).map(([date, totalDuration]) => ({
    date,
    totalDuration,
  }));
}
