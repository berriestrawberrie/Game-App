import React, { useState } from "react";

const GameRules: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-0 right-[5px]">
      {/* Toggle button */}
      <span
        onClick={() => setOpen((prev) => !prev)}
        className="absolute right-0 top-0 text-lightaccent-600 text-3xl rounded hover:cursor-pointer transition"
      >
        <i className="fa-solid fa-circle-question"></i>
      </span>

      {/* Toggle content */}
      <div
        className={`mt-8 p-4 bg-light-200 rounded shadow transition-opacity dark:bg-dark-100 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <p className="text-left">
          <span className="font-bold">Directions:</span> Score will be recorded
          for the current player.
        </p>
        <ul className="text-left">
          <li>
            Press Start ( <i className="fa-solid fa-play"></i> ) to play the
            game.
          </li>
          <li>
            Press Stop ( <i className="fa-solid fa-stop"></i> ) to end the game
            and send your score
          </li>
          <li>
            Press Exit ( <i className="fa-solid fa-xmark"></i> ) if you want to
            return to game selection without saving
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GameRules;
