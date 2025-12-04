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
      <div className="dark:text-light-100 mx-auto w-full sm:w-3/4 mb-12">
        <Weather />
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
