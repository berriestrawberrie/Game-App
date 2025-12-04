import { useParams } from "react-router-dom";

type PlayerParams = {
  id: string;
};

export const Player: React.FC = () => {
  const { id } = useParams<PlayerParams>();
  return <h2>Player ID: {id}</h2>;
};
