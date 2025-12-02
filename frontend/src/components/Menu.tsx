const Menu = () => {
  return (
    <>
      // SIDEBAR
      <nav className="border-r-1 border-stone-400 bg-stone-200 w-full flex flex-col items-center py-4 sm:h-screen sm:w-[70px]">
        <ul className="flex items-center w-full justify-evenly sm:flex-col sm:space-y-6">
          <li>
            <a href="#" title="Home">
              <i className="fa-solid fa-house text-4xl hover:text-blue-600"></i>
            </a>
          </li>

          {/* Profile (current page) */}
          <li>
            <a href="#" title="Profile">
              <i
                className="fa-regular fa-circle-user text-4xl text-blue-600"
                aria-hidden="true"
              ></i>
            </a>
          </li>

          {/* Users */}
          <li>
            <a href="#" title="Users">
              <i
                className="fa-solid fa-user-group text-4xl hover:text-blue-600"
                aria-hidden="true"
              ></i>
            </a>
          </li>

          {/* Games */}
          <li>
            <a href="#" title="Games">
              <i
                className="fa-solid fa-gamepad text-4xl hover:text-blue-600"
                aria-hidden="true"
              ></i>
            </a>
          </li>

          {/* Game Statistics */}
          <li>
            <a href="#" title="Game Statistics">
              <i
                className="fa-solid fa-trophy text-4xl hover:text-blue-600"
                aria-hidden="true"
              ></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
