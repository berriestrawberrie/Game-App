import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/games`;

export const getAllGames = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/selectgames`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
