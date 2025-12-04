import { useNavigate } from "react-router-dom";
import { logout } from "../../api/playerHandler";

export const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // redirect to login page
  };

  return (
    <button onClick={handleLogout} title="Sign Out">
      <i className="fa-solid fa-door-open text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"></i>
    </button>
  );
};
