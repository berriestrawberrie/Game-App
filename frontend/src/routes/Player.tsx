import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuthStore } from "../store/authStore";
import { getUserScores } from "../api/playerHandler";
import type { UserScoreInterface } from "../interfaces/interfaces";
import BarGraph from "../components/BarGraph";
import PieGraph from "../components/PieGraph";
import { sumDurationByGame } from "../helpers/functions";
import { Link } from "react-router-dom";

export const Player: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const token = useAuthStore((state) => state.token); // get token from Zustand
  const [data, setData] = useState<UserScoreInterface>();

  useEffect(() => {
    if (!token) return console.log("Missing Player Token");
    const fetchData = async () => {
      try {
        const fetchedUser = await getUserScores(token, userId!);
        setData(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user score data:", error);
      }
    };
    fetchData();
  }, [token]);

  const name: string = data ? `${data.firstName} ${data.lastName}` : "";
  const totalMinutes: number = data
    ? data.scores.reduce((sum, score) => sum + score.durationMinutes, 0)
    : 0;
  const graphData = data ? sumDurationByGame(data) : [];

  return (
    <>
      <Layout title={name + ": Game Overview"}>
        <div className="flex flex-col sm:flex-row items-center justify-evenly">
          <div>
            <img
              id="imagePreview"
              className="opacity-20"
              src="/user-2.png"
              alt="Profile Preview"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <BarGraph graphData={graphData} />
          </div>
        </div>
        {/*BOTTOM UI*/}
        <div className="flex flex-col sm:flex-row  items-center justify-evenly">
          <div>
            <PieGraph graphData={graphData} />
          </div>
          <div className="lg:w-1/2">
            <div className="mx-auto text-white bg-lightaccent-600 lg:w-3/4 h-[115px] rounded-xl text-center p-3 text-2xl lg:text-3xl m-4 dark:bg-darkaccent-600 dark:text-black">
              <h3 className=" font-bold ">Total Play Time</h3>
              <p className="mt-2">{totalMinutes}</p>
            </div>
            <Link to="/selectgames" title="Games">
              <button className="block mx-auto gmBtn text-white bg-lightaccent-600 lg:w-3/4 rounded-xl text-center p-3 text-2xl lg:text-3xl dark:bg-darkaccent-600 dark:text-black ">
                <h3 className=" font-bold ">
                  <i className="fa-solid fa-dice me-2 "></i>New Game
                </h3>
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};
