import { useParams } from "react-router-dom";

type UserParams = {
  id: string;
};

export const User: React.FC = () => {
  const { id } = useParams<UserParams>();
  return <h2>User ID: {id}</h2>;
};
