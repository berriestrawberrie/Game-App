import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Timer: React.FC = () => {
  const navigate = useNavigate();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  //const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Update display string
  const scaledSeconds = elapsedSeconds * 60; // 1 sec = 1 min
  const minutes = Math.floor(scaledSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (scaledSeconds % 60).toString().padStart(2, "0");
  const display = `${minutes}:${seconds}`;

  // Start timer
  const startTimer = () => {
    if (!timerRef.current) {
      //setRunning(true);
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Stop timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      //setRunning(false);
    }
  };

  // Exit (reset)
  const exitTimer = () => {
    stopTimer();
    setElapsedSeconds(0);
    navigate(`/selectgames`);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <>
      <div
        id="timerDisplay"
        className="text-6xl font-mono font-semibold text-lightaccent-600 mb-10 text-center"
      >
        {display}
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <button
          id="startBtn"
          onClick={startTimer}
          className="bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition  gmBtn w-[120px] h-10"
        >
          <i className="fa-solid fa-play"></i> Start
        </button>

        <button
          id="stopBtn"
          onClick={stopTimer}
          className="bg-yellow-500 text-white rounded font-semibold hover:bg-yellow-600 transition  gmBtn w-[120px] h-10"
        >
          <i className="fa-solid fa-stop"></i> Stop
        </button>

        <button
          id="exitBtn"
          onClick={exitTimer}
          className=" bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition gmBtn w-[120px] h-10"
        >
          <i className="fa-solid fa-xmark"></i> Exit
        </button>
      </div>
    </>
  );
};

export default Timer;
