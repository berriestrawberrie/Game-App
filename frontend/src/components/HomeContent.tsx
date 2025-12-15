const HomeContent: React.FC = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <h1 className="text-5xl text-blue-600 font-bold mb-8">Game API</h1>

        <img className="w-4/5 sm:w-2/5" src="/game.png" alt="Game preview" />

        <div className="bg-white mt-4 rounded-lg w-4/5 sm:w-2/5 p-2 border-2 border-blue-600 dark:bg-dark-100">
          <div className="-mt-6 mx-auto bg-blue-600 p-2 rounded-lg w-[150px] text-white font-bold">
            Backend Project
          </div>

          <p className="mt-2">
            🏁 Build an app where users choose games, start/stop a timer, and
            view clear statistics of played time.
          </p>

          <p className="text-right">
            <a
              href="https://github.com/berriestrawberrie/Game-App"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="text-right hover:text-blue-500 text-4xl fa-brands fa-github"></i>
            </a>
          </p>
        </div>

        <div className="mt-2 w-4/5 sm:w-2/5 flex flex-wrap justify-center gap-2">
          <span className="p-2 rounded-3xl text-sky-800 font-semibold bg-sky-200">
            @BrookeBrown
          </span>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
