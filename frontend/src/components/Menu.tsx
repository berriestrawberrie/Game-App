import { Link } from "react-router-dom";
import { Logout } from "./Login/Logout";

const Menu = () => {
  return (
    <nav className="fixed z-10 top-0 bg-light-100 border-e border-b border-light-200  w-full flex flex-col items-center py-4 sm:h-screen sm:w-[70px] dark:bg-dark-100 dark:text-light-200 dark:border-dark-300">
      <ul className="flex items-center w-full justify-evenly sm:flex-col sm:space-y-6">
        <li>
          <Link to="/" title="Home">
            <i className="fa-solid fa-house text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"></i>
          </Link>
        </li>

        {/* Profile (current page) */}
        <li>
          <Link to="/login" title="Login">
            <i
              className="fa-regular fa-circle-user text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"
              aria-hidden="true"
            ></i>
          </Link>
        </li>

        {/* Users */}
        <li>
          <a href="#" title="Users">
            <i
              className="fa-solid fa-user-group text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"
              aria-hidden="true"
            ></i>
          </a>
        </li>

        {/* Games */}
        <li>
          <a href="#" title="Games">
            <i
              className="fa-solid fa-gamepad text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"
              aria-hidden="true"
            ></i>
          </a>
        </li>

        {/* Game Statistics */}
        <li>
          <a href="#" title="Game Statistics">
            <i
              className="fa-solid fa-trophy text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"
              aria-hidden="true"
            ></i>
          </a>
        </li>
        {/* SIGN OUT */}
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
