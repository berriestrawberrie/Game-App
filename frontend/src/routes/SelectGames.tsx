import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { getAllGames } from "../api/gameHandler";
import type { GameInterface } from "../interfaces/interfaces";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface GameData extends GameInterface {
  id: number;
}

const SelectGame = () => {
  const token = useAuthStore((state) => state.token);
  const [data, setData] = useState<GameData[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.log("Missing Player Token");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const fetchedGames = await getAllGames(token);
        setData(fetchedGames);
        console.log(fetchedGames);
      } catch (error) {
        console.error("Failed to fetch games data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  return (
    <>
      <Layout title="Select A Game">
        {loading ? (
          // Loader centered on the page
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {data &&
              data.map((game) => (
                <Link
                  key={game.id}
                  to={`/playgame/${game.title}/${game.id}`}
                  title={game.title}
                >
                  <div
                    className="rounded-xl bg-light-200 w-[200px] h-[250px] p-2
                  dark:bg-dark-100 dark:text-white"
                  >
                    {game.id === 1 ? (
                      <i className="fa-solid text-6xl text-center fa-chess-knight w-full my-2"></i>
                    ) : game.id === 2 ? (
                      <i className="fa-solid text-6xl text-center fa-dice w-full my-2"></i>
                    ) : game.id === 3 ? (
                      <i className="fa-solid text-6xl text-center fa-puzzle-piece w-full my-2"></i>
                    ) : (
                      <i className="fa-solid text-6xl text-center fa-table-tennis-paddle-ball w-full my-2"></i>
                    )}
                    <h3 className="text-center font-bold text-lg">
                      {game.title}
                    </h3>
                    <p className="m-2">{game.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </Layout>
    </>
  );
};

export default SelectGame;
