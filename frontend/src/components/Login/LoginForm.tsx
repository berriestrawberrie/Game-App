import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/playerHandler";
import { Credentials } from "../Credentials";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "../Alert";
const FORM_INIT_STATE = {
  password: "",
  email: "",
};

const LoginForm: React.FC = () => {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [formData, setFormData] = useState(FORM_INIT_STATE);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (error) {
      setError(error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await login(formData);

      if (!result) {
        setAlert({ message: "Failed to login player.", type: "error" });
        return;
      }

      const { token, loggedUser, uid } = result;
      const name =
        loggedUser.data.user.firstName + " " + loggedUser.data.user.lastName;
      // Save token in localStorage or context
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("avatar", loggedUser.data.user.avatarUrl);
      localStorage.setItem("userId", loggedUser.data.user.id);
      // Navigate to user page with UID
      navigate(`/player/${uid}`);
    } catch (error) {
      console.error("Login error:", error);
      setAlert({ message: "Failed to login player.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {loading ? ( // Loader centered on the page
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="relative mx-auto sm:w-4/5  text-black  p-4 flex justify-center items-center dark:text-light-300">
          <Credentials />
          <form
            className="w-full flex flex-col justify-evenly rounded-xl bg-light-200 dark:bg-dark-100  p-4 h-[300px]"
            onSubmit={handleLogin}
          >
            <label htmlFor="email" className="w-3/4 mx-auto font-medium">
              Email address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-3/4 mx-auto border  border-gray-400 rounded px-3 py-2 focus:outline-none"
            />
            <label htmlFor="password" className="w-3/4 mx-auto font-medium">
              Password *
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-3/4 mx-auto border  border-gray-400 rounded px-3 py-2 focus:outline-none"
            />

            <button
              type="submit"
              className="w-3/4  mx-auto bg-blue-600 p-3 text-white rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      )}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
};

export default LoginForm;
