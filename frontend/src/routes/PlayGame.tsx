import Layout from "../components/Layout";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Timer from "../components/Timer";
import HelpBox from "../components/GameRules";

const PlayGame = () => {
  const { gameTitle, gameId } = useParams<{
    gameTitle: string;
    gameId: string;
  }>();
  const numericGameId: number = Number(gameId);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  useEffect(() => console.log(numericGameId, user, token), []);

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
      </Layout>
    </>
  );
};

export default PlayGame;
