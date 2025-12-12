import Layout from "../components/Layout";
import type { ScoreInterface } from "../interfaces/interfaces";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { getAllScores } from "../api/scoreHandler";
import { getTop3GamesByDuration } from "../helpers/functions";
import TopPie from "../components/Statistics/TopPie";

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

const Statistics = () => {
  const [data, setData] = useState<ScoreData[]>();
  const [top3, setTop3] = useState<TopScores[]>();
  const token = useAuthStore((state) => state.token);

  const fetchData = async () => {
    try {
      const fetchedScores = await getAllScores(token!);
      console.log(fetchedScores);
      const calculatedTop3 = getTop3GamesByDuration(fetchedScores);
      setTop3(calculatedTop3);
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
          {top3 && (
            <div>
              <h3 className="text-lg font-bold text-center">
                Top 3 Games by Scores
              </h3>
              <TopPie top3Data={top3} />
            </div>
          )}
        </div>
        <div id="lowerStats"></div>
      </div>
    </Layout>
  );
};

export default Statistics;
