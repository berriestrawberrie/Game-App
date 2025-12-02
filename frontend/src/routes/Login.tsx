import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // after login success
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
};
