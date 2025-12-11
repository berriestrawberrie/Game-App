import Layout from "../components/Layout";
import { useAuthStore } from "../store/authStore";
import { Login } from "./Login";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const userName = localStorage.getItem("name");
  return (
    <>
      {user ? (
        <Layout title={`${userName} Welcome Back!`}>
          <p>I'm a paragraph!</p>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
