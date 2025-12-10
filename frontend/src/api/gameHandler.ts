import axios from "axios";

const BACKEND_PORT = "4000";
const BASE_URL = `http://localhost:${BACKEND_PORT}/games`;

export const getAllGames = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/selectgames`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
