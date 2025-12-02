import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import RegisterForm from "../components/Login/RegisterForm";

interface Props {}
export const Login: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // after login success
    navigate("/");
  };

  return (
    <>
      <Layout title="New Player">
        <RegisterForm />
      </Layout>
    </>
  );
};
