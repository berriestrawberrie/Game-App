import axios from "axios";

const BACKEND_PORT = "4000";
const BASE_URL = `http://localhost:${BACKEND_PORT}/scores`;

export const getGameScores = async (token: string, gameId: number) => {
  const res = await axios.get(`${BASE_URL}/game/${gameId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
