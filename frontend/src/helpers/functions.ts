import type { UserScoreInterface } from "../interfaces/interfaces";

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
