import Layout from "../components/Layout";
import LoginForm from "../components/Login/LoginForm";

export const Login: React.FC = () => {
  //const user = useAuthStore((state) => state.user); // subscribe only to user

  return (
    <>
      <Layout title="Login">
        <div className=" mx-auto sm:w-4/5 ps-5 -mb-3">
          <span
            className={
              "hover:cursor-pointer p-3 rounded-t-xl bg-light-200 dark:bg-dark-100"
            }
          >
            Login
          </span>
        </div>
        <LoginForm />
      </Layout>
    </>
  );
};
