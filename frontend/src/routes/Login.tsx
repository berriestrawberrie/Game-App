import Layout from "../components/Layout";
import RegisterForm from "../components/Login/RegisterForm";
import { useState } from "react";
import LoginForm from "../components/Login/LoginForm";

export const Login: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  //const user = useAuthStore((state) => state.user); // subscribe only to user

  return (
    <>
      <Layout title={showLogin ? "Login" : "New Player"}>
        <div className="mx-auto sm:w-4/5 ps-5 -mb-3">
          <span
            onClick={() => setShowLogin(true)}
            className={
              showLogin
                ? "hover:cursor-pointer p-3 rounded-t-xl bg-light-200 dark:bg-dark-100"
                : "hover:cursor-pointer p-3 text-lightaccent-600 dark:text-lightaccent-600"
            }
          >
            Login
          </span>
          <span
            onClick={() => setShowLogin(false)}
            className={
              showLogin
                ? "hover:cursor-pointer p-3 text-lightaccent-600 dark:text-lightaccent-600"
                : "hover:cursor-pointer p-3 rounded-t-xl bg-light-200 dark:bg-dark-100"
            }
          >
            Register
          </span>
        </div>
        {showLogin && <LoginForm />}
        {!showLogin && <RegisterForm />}
      </Layout>
    </>
  );
};
