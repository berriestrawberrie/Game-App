import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { newGameScore } from "../api/scoreHandler";
import Alert from "./Alert";

interface TimerProp {
  token: string;
  gameId: number;
  userId: number;
  onScoreSubmit: () => void;
  userName: string | null;
}

const Timer: React.FC<TimerProp> = ({
  token,
  gameId,
  userId,
  onScoreSubmit,
  userName,
}) => {
  const navigate = useNavigate();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  //const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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
  const stopTimer = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    try {
      await newGameScore(token, gameId, userId, Number(minutes));
      setAlert({
        message: `${userName} just scored ${Number(minutes)}pts!`,
        type: "success",
      });
      setElapsedSeconds(0);
      onScoreSubmit();
    } catch (error) {
      console.error("Error sending score:", error);
      setAlert({ message: "Failed to submit Score.", type: "error" });
    }
  };

  // Exit (reset)
  const exitTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
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
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div
        id="timerDisplay"
        className="text-6xl font-mono font-semibold text-lightaccent-600 mt-3 mb-10 text-center"
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
