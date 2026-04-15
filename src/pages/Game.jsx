import { useNavigate } from "react-router-dom";
import { fetchCandyLandPhotos, processImages } from "../api/cards.js";
import { prepareCards } from "../utils/helpers.js";
import GameBoard from "../components/GameBoard.jsx";
import { GameContext } from "../context/GameContext.jsx";
import { useState, useEffect, useContext } from "react";
import Loading from "../components/loading.jsx";
import Error from "../components/Error.jsx";

export default function Game() {
  //Page Redirection
  const navigate = useNavigate();
  const handleGameOver = () => {
    navigate("/game-over");
  };

  //Local state variables
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { setCards, cards } = useContext(GameContext);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchCandyLandPhotos(); // already processed
        const imgCards = prepareCards(result);
        if (imgCards) setCards(imgCards);
        console.log("imgCards", imgCards);
        console.log("cards", cards);
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (hasError) return <Error />;

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
          <button
            className="px-6 py-3 bg-orange-900 text-pink-100 font-bold rounded-xl shadow-lg hover:bg-pink-300 hover:scale-105 transition transform duration-200"
            onClick={handleGameOver}
          >
            Quit
          </button>
        </footer>
      </div>
    </div>
  );
}
