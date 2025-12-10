import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Timer from "../components/Timer";
import HelpBox from "../components/GameRules";
import { getGameScores } from "../api/scoreHandler";
import type { ScoreInterface } from "../interfaces/interfaces";

interface ScoreData extends ScoreInterface {
  id: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

const PlayGame = () => {
  const { gameTitle, gameId } = useParams<{
    gameTitle: string;
    gameId: string;
  }>();
  const numericGameId: number = Number(gameId);
  const [data, setData] = useState<ScoreData[]>();
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const userName = localStorage.getItem("name");
  const avatar = localStorage.getItem("avatar");
  useEffect(() => {
    if (!token) {
      console.log("Missing Player Token");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const fetchedScores = await getGameScores(token, numericGameId);
        setData(fetchedScores);
        console.log(fetchedScores);
      } catch (error) {
        console.error("Failed to fetch Scores data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  return (
    <>
      <Layout title={gameTitle!}>
        <div className="relative">
          <HelpBox />
          {numericGameId === 1 ? (
            <i className="fa-solid text-8xl text-center fa-chess-knight w-full my-2"></i>
          ) : numericGameId === 2 ? (
            <i className="fa-solid text-8xl text-center fa-dice w-full my-2"></i>
          ) : numericGameId === 3 ? (
            <i className="fa-solid text-8xl text-center fa-puzzle-piece w-full my-2"></i>
          ) : (
            <i className="fa-solid text-8xl text-center fa-table-tennis-paddle-ball w-full my-2"></i>
          )}
        </div>
        <Timer />
        <div className="flex flex-col-reverse items-center justify-center mt-4 sm:flex-row">
          {/*TABLE */}
          <table className="text-center mx-auto mt-3 bg-light-100 border-separate  border-spacing-2 rounded-lg dark:bg-dark-100">
            <thead>
              <tr>
                <th>GameID</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((score, index) => (
                  <tr key={index}>
                    <td>{score.gameId}</td>
                    <td>{`${score.user.firstName}`}</td>
                    <td>{score.durationMinutes ?? "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/*USER DISPLAY */}
          <div className="text-center text-xl">
            <img
              className="mx-auto h-[300px]"
              src={avatar ?? "/user-2.png"}
              alt={`${userName} avatar`}
              onError={(e) => {
                e.currentTarget.src = "/user-2.png";
              }}
            />
            {userName}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PlayGame;
