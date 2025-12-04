import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useAuthStore } from "../store/authStore";

type PlayerParams = {
  uid: string;
};

export const Player: React.FC = () => {
  const { uid } = useParams<PlayerParams>();
  //const [prismaUser, setPrismaUser] = useState<any>(null);
  const token = useAuthStore((state) => state.token); // get token from Zustand
  //const authUser = useAuthStore((state) => state.user); // Firebase user object

  useEffect(() => {
    if (!token || !uid) return console.log("Missing Player UID or Token");
  }, []);

  return (
    <>
      <Layout title={"Player"}>
        <h2>Player ID: {uid}</h2>
      </Layout>
    </>
  );
};
