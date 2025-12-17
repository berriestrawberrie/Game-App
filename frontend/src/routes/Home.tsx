import Layout from "../components/Layout";
import HomeContent from "../components/HomeContent";

const Home = () => {
  const userName = localStorage.getItem("name");
  return (
    <>
      <Layout title={`${userName} Welcome Back!`}>
        <HomeContent />
      </Layout>
    </>
  );
};

export default Home;
