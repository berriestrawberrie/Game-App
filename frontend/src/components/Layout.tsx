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
    <div className="sm:flex bg-white dark:bg-dark-200">
      <Menu />
      <div className="fixed bottom-0 right-0">
        <ThemeToggle />
      </div>
      <div className="dark:text-light-100">
        <Weather />
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
