import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuthStore } from "../store/authStore";
import { getUserScores } from "../api/playerHandler";
import type { UserScoreInterface } from "../interfaces/interfaces";

export const Player: React.FC = () => {
  //const [prismaUser, setPrismaUser] = useState<any>(null);
  const token = useAuthStore((state) => state.token); // get token from Zustand
  const [data, setData] = useState<UserScoreInterface>();

  useEffect(() => {
    if (!token) return console.log("Missing Player Token");
    const fetchData = async () => {
      try {
        const fetchedUser = await getUserScores(token);
        setData(fetchedUser);
        console.log(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user score data:", error);
      }
    };
    fetchData();
  }, [token]);

  const name = data ? `${data.firstName} ${data.lastName}` : "";

  return (
    <>
      <Layout title={name}>
        <h2>Welcome back </h2>
        {!data ? (
          <p>No scores yet.</p>
        ) : (
          <ul>
            {data.scores.map((score) => (
              <li key={score.id}>
                <strong>{score.game.title}</strong> – {score.durationMinutes}{" "}
                minutes
                <br />
                Started: {new Date(score.startedAt).toLocaleString()}
                <br />
                Stopped: {new Date(score.stoppedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
        );
      </Layout>
    </>
  );
};
