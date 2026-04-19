import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext.jsx";
import { useState, useEffect, useContext } from "react";
import Loading from "../components/loading.jsx";
import Error from "../components/Error.jsx";
import GameBoard from "../components/GameBoard.jsx";

export default function Game() {
  const { loading, error, cards, isGameOver } = useContext(GameContext);
  const navigate = useNavigate();

  //Ensures redirection to gameOver page when game is over
  useEffect(() => {
    if (isGameOver) {
      //Adds a small delay for UX improvement
      const timer = setTimeout(() => {
        navigate("/game-over");
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [cards]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-pink-50 p-10">
      {/* <header className="pt-5">
        <h1 className="text-4xl font-bold text-pink-500">Game Board</h1>
      </header>
      <GameBoard />
      <footer className="pb-5">
        <button
          className="px-6 py-3 bg-orange-900 text-pink-100 font-bold rounded-xl shadow-lg hover:bg-pink-300 hover:scale-105 transition transform duration-200"
          onClick={handleGameOver}
        >
          Quit
        </button>
      </footer> */}
      <div className="flex flex-col gap-8 items-center justify-center p-5 bg-pink-200/30 ">
        <h1 className="text-4xl font-bold text-pink-500">Game Board</h1>
        <GameBoard />
        <footer>
          <button className="px-6 py-3 bg-orange-900 text-pink-100 font-bold rounded-xl shadow-lg hover:bg-pink-300 hover:scale-105 transition transform duration-200">
            Quit
          </button>
        </footer>
      </div>
    </div>
  );
}
