import { Link } from "react-router-dom";
import { Logout } from "./Login/Logout";
import { useAuthStore } from "../store/authStore";

const Menu = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="fixed z-10 top-0 bg-light-100 border-e border-b border-light-200 w-full flex flex-col items-center py-4 sm:h-screen sm:w-[70px] dark:bg-dark-100 dark:text-light-200 dark:border-dark-300">
      <ul className="flex items-center w-full justify-evenly sm:flex-col sm:space-y-6">
        <li>
          <Link to="/home" title="Home">
            <i className="fa-solid fa-house text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"></i>
          </Link>
        </li>

        {user && (
          <>
            {/*Profile*/}
            <li>
              <Link to={`/player/${user.uid}`} title="My Profile">
                <i
                  className="fa-regular fa-circle-user text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"
                  aria-hidden="true"
                ></i>
              </Link>
            </li>
            {/* Users */}
            <li>
              <Link to="/allplayers" title="Users">
                <i
                  className="fa-solid fa-user-group text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"
                  aria-hidden="true"
                ></i>
              </Link>
            </li>

            {/* Games */}
            <li>
              <Link to="/selectgames" title="Games">
                <i
                  className="fa-solid fa-gamepad text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"
                  aria-hidden="true"
                ></i>
              </Link>
            </li>

            {/* Game Statistics */}
            <li>
              <Link to="/statistics" title="Games Statistics">
                <i
                  className="fa-solid fa-trophy text-4xl hover:text-lightaccent-600 dark:hover:text-darkaccent-600"
                  aria-hidden="true"
                ></i>
              </Link>
            </li>

            {/* SIGN OUT */}
            <li>
              <Logout />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
