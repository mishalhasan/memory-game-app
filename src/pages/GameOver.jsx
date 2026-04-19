import { Link } from "react-router-dom";

export default function GameOver() {
  return (
    <div className="flex flex-col gap-10 h-screen items-center justify-center bg-pink-50">
      <h1 className="text-4xl font-bold text-pink-500">Game Over</h1>
      <div className=" flex gap-3 ">
        <Link onclick={handleRestart} to="/game">
          <button className="px-6 py-3 rounded-lg bg-pink-500 text-white font-bold">
            Play Again
          </button>
        </Link>
        <Link to="/">
          <button className="px-6 py-3 rounded-lg bg-white text-pink-400 font-bold">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
