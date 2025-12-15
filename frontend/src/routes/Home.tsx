import Layout from "../components/Layout";
import { useAuthStore } from "../store/authStore";
import { Login } from "./Login";
import HomeContent from "../components/HomeContent";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const userName = localStorage.getItem("name");
  return (
    <>
      {user ? (
        <Layout title={`${userName} Welcome Back!`}>
          <HomeContent />
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
