import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { registerPlayer } from "../../api/playerHandler";
import { FirebaseError } from "firebase/app";
import Alert from "../Alert";
import z from "zod";
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

  const [formData, setFormData] = useState(FORM_INIT_STATE);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    if (formData.password !== formData.repeatpassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
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
    }
  };

  return (
    <>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="mx-auto sm:w-4/5 bg-light-200 text-black rounded-xl p-4 flex justify-center items-center dark:bg-dark-100 dark:text-light-300">
        <form
          id="registerForm"
          className="register w-full mx-auto space-y-3"
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

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 px-2 text-white rounded hover:bg-blue-700 transition"
              >
                Register
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
