import Layout from "../components/Layout";
import type { ScoreInterface } from "../interfaces/interfaces";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { getAllScores } from "../api/scoreHandler";
import { getTop3GamesByDuration, getTop3Players } from "../helpers/functions";
import TopPie from "../components/Statistics/TopPie";
import TopPlayers from "../components/Statistics/TopPlayers";

interface ScoreData extends ScoreInterface {
  id: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface TopScores {
  gameId: number;
  name: string;
  totalMinutes: number;
}
interface TopPlayers {
  firstName: string;
  lastName: string;
  totalDuration: number;
}

const Statistics = () => {
  const [data, setData] = useState<ScoreData[]>();
  const [top3Games, setTop3Games] = useState<TopScores[]>();
  const [top3Players, setTop3Players] = useState<TopPlayers[]>();
  const token = useAuthStore((state) => state.token);

  const fetchData = async () => {
    try {
      const fetchedScores = await getAllScores(token!);
      //GET THE TOP 3 GAMES
      const calculatedTop3Games = getTop3GamesByDuration(fetchedScores);
      setTop3Games(calculatedTop3Games);
      //GET THE TOP 3 PLAYERS
      const calculatedTop3Players = getTop3Players(fetchedScores);
      setTop3Players(calculatedTop3Players);
      console.log(calculatedTop3Players);
      setData(fetchedScores);
    } catch (error) {
      console.error("Failed to fetch Scores data:", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);

  return (
    <Layout title="Game Statistics">
      <div id="statWrapper">
        <div id="topStats" className="flex flex-col sm:flex-row">
          {top3Players && (
            <div className="w-full sm:w-1/2">
              <h3 className="text-lg font-bold text-center">
                Top 3 Players by Scores
              </h3>
              <TopPlayers playerData={top3Players} />
            </div>
          )}
          {top3Games && (
            <div>
              <h3 className="text-lg font-bold text-center">
                Top 3 Games by Scores
              </h3>
              <TopPie top3Data={top3Games} />
            </div>
          )}
        </div>
        <div id="lowerStats"></div>
      </div>
    </Layout>
  );
};

export default Statistics;
