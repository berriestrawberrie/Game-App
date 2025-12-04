import type { ReactNode } from "react";
import Menu from "./Menu";
import Weather from "./Weather";
import ThemeToggle from "./ThemeToggle";

interface Props {
  title: string;
  children?: ReactNode;
}

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="sm:flex ">
      <Menu />
      <div className="fixed bottom-[10px] right-0">
        <ThemeToggle />
      </div>
      <div className="my-[100px] dark:text-light-100 mx-auto w-full sm:my-2.5 sm:w-3/4 ">
        <Weather />
        <h1 className="text-3xl font-bold text-center mb-3">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
