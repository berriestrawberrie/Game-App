import Layout from "../components/Layout";
import { useAuthStore } from "../store/authStore";
import { Login } from "./Login";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      {user ? (
        <Layout title="Home">
          <p>I'm a paragraph!</p>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
