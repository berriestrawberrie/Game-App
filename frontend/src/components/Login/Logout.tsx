import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect to login page
  };

  return (
    <button onClick={handleLogout} title="Sign Out">
      <i className="fa-solid fa-door-open text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"></i>
    </button>
  );
};
