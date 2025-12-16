import { useState } from "react";
import { registerPlayer } from "../../api/playerHandler";
import Alert from "../Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const FORM_INIT_STATE = {
  firstName: "",
  lastName: "",
  password: "",
  repeatpassword: "",
  email: "",
};

const RegisterForm: React.FC = () => {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(FORM_INIT_STATE);
  const [error, setError] = useState("");

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

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.repeatpassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      await registerPlayer({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      setAlert({ message: "Player registered successfully!", type: "success" });
      setFormData(FORM_INIT_STATE);
      //navigate("/");
    } catch (error: unknown) {
      console.error("Registration error:", error);
      setAlert({ message: "Failed to register player.", type: "error" });
    } finally {
      setLoading(false);
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
        <div className="mx-auto sm:w-4/5  text-black p-4 flex justify-center items-center  dark:text-light-300">
          <form
            id="registerForm"
            className="w-full bg-light-200 mx-auto space-y-3 p-5 rounded-xl  dark:bg-dark-100"
            onSubmit={handleRegistration}
          >
            {error && <p className="registration-form__error">{error}</p>}
            <fieldset className="flex flex-col sm:flex-row gap-2">
              <div className=" w-full">
                <label htmlFor="firstName" className="block font-medium">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  minLength={3}
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="min. (3) chars"
                  required
                  className="w-full border border-gray-400 rounded px-3 py-2 "
                />
              </div>
              <div className=" w-full">
                <label htmlFor="lastName" className="block font-medium">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  minLength={3}
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="min. (3) chars"
                  required
                  className="w-full border border-gray-400 rounded px-3 py-2 e"
                />
              </div>
            </fieldset>
            <fieldset className="flex flex-col sm:flex-row gap-2">
              <div className=" w-full">
                <label htmlFor="password" className="block font-medium">
                  Password *
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border  border-gray-400 rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div className=" w-full">
                <label htmlFor="repeatpassword" className="block font-medium">
                  Confirm Password *
                </label>
                <input
                  type="text"
                  id="repeatpassword"
                  name="repeatpassword"
                  value={formData.repeatpassword}
                  onChange={handleChange}
                  required
                  className="w-full border  border-gray-400 rounded px-3 py-2 focus:outline-none"
                />
              </div>
            </fieldset>
            <label htmlFor="email" className="block font-medium">
              Email address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border  border-gray-400 rounded px-3 py-2 focus:outline-none"
            />

            <fieldset className="border-none flex-col sm:flex justify-between mt-4">
              <div className="flex hidden flex-col items-center">
                <div className="relative mb-[10px] w-fit border border-gray-400 p-2 rounded bg-white">
                  <img
                    id="imagePreview"
                    className="opacity-20"
                    src="/user-2.png"
                    alt="Profile Preview"
                  />
                  <span
                    id="closeBtn"
                    className="hidden text-white font-bold text-lg absolute -top-[10px] -right-[5px]"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
                <input
                  type="file"
                  id="imageInput"
                  name="file"
                  className="block text-sm text-gray-600 border border-light-200 max-w-[200px] rounded p-1 dark:text-light-200"
                />
              </div>
              <p className="text-xs -mt-4 mb-2 font-bold">
                *You may register new users, but you will not be able to reset
                the password or delete the account as this is a test
                application.
              </p>
              <button
                type="submit"
                className="w-full bg-blue-600 p-3 text-white rounded hover:bg-blue-700 transition"
              >
                Register
              </button>
            </fieldset>
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

export default RegisterForm;
