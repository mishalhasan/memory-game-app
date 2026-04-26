import { useGameNavigation } from "../hooks/useGameNavigation";
import { useRecordCelebration } from "../hooks/useRecordCelebration";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { formatTime, getBestTime } from "../utils/helpers";
import confetti from "canvas-confetti";

export default function GameOver() {
  const { goHome, restartGame } = useGameNavigation();
  const { elapsedTime, moves } = useContext(GameContext);

  const isNewRecord = useRecordCelebration(elapsedTime, getBestTime());

  return (
    <div
      className="fixed inset-0 flex items-center justify-center 
                bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200"
    >
      {/* soft pink overlay  */}
      <div className=" absolute inset-0 bg-amber-100/20 z-0" />

      <div
        className="relative flex flex-col items-center justify-center gap-10 
                  bg-pink-50/40 backdrop-blur-md z-10
                  border border-white/60 
                  shadow-lg rounded-2xl 
                  px-12 py-10 max-w-md w-full"
      >
        <h1 className=" font-cursive text-5xl font-bold text-pink-500 tracking-tight">
          Sweet Victory!
        </h1>

        {/* stats */}
        <div className="flex flex-col gap-3 items-center">
          <div className="flex justify-center gap-4">
            <h3 className="text-2xl font-[poppins] font-semibold text-blue-800">
              Time:{" "}
              <span className=" text-blue-800 font-[inter] font-semibold">
                {formatTime(elapsedTime)}
              </span>
            </h3>

            <h3 className="text-2xl font-[poppins] font-semibold text-blue-800">
              Moves:{" "}
              <span className=" text-blue-800 font-[inter] font-semibold">
                {moves}
              </span>
            </h3>
          </div>

          <h4 className="text-lg font-[poppins] font-bold  text-purple-900">
            Best Time:{" "}
            <span className="text-purple-900 font-[inter] font-bold">
              {formatTime(getBestTime())}
            </span>
          </h4>
          
          <span className={`${isNewRecord ? "block" : "hidden"} mt-5 text-lg font-[poppins] font-bold  text-amber-400/80`}>
            🏆 New Personal Best!
          </span>

        </div>

        {/* buttons */}
        <div className="flex gap-4 w-full">
          <button
            onClick={restartGame}
            className="font-emphasis flex-1 py-3 rounded-xl 
                   bg-pink-400 text-white font-semibold
                   hover:bg-pink-500 transition
                   shadow-sm"
          >
            Play Again
          </button>

          <button
            onClick={goHome}
            className="font-emphasis flex-1 py-3 rounded-xl 
                   bg-pink-50 text-pink-400 font-semibold
                   border border-pink-100
                   hover:bg-pink-100/80 transition"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
