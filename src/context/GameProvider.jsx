import { useState } from "react";
import { GameContext } from "./GameContext";
import { useGameEngine } from "../hooks/useGameEngine";
// Create provider
export const GameProvider = ({ children }) => {
  // const [score, setScore] = useState(0);
  // const increaseScore = () => setScore((prev) => prev + 1);
  // const [load, setLoad] = useState(false);

  // const [cards, setCards] = useState([]);
  // const [cardsClickable, setCardsClickable] = useState(true);
  // const [firstCardID, setFirstCardID] = useState(null);
  const {
    cards,
    setCards,
    loading,
    error,
    cardsClickable,
    setCardsClickable,
    firstCardID,
    setFirstCardID,
    handleCardClick,
    isGameOver,
    handleGameReset,
  } = useGameEngine();

  return (
    <GameContext.Provider
      value={{
        cards,
        setCards,
        loading,
        error,
        cardsClickable,
        setCardsClickable,
        firstCardID,
        setFirstCardID,
        handleCardClick,
        isGameOver,
        handleGameReset,
        // score,
        // increaseScore,
        // load,
        // setLoad,
        // cards,
        // setCards,
        // firstCardID,
        // setFirstCardID,
        // cardsClickable,
        // setCardsClickable,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
