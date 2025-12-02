import type { ReactNode } from "react";
import Menu from "./Menu";

interface Props {
  title: string;
  children?: ReactNode;
}

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Menu />
      <div>
        <h1>{title}</h1>
        {children}
      </div>
    </>
  );
};

export default Layout;
