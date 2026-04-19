import { useState } from "react";
import { GameContext } from "./GameContext";

// Create provider
export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const increaseScore = () => setScore((prev) => prev + 1);
  const [load, setLoad] = useState(false);
  
  const [cards, setCards] = useState([]);
  const [cardsClickable, setCardsClickable] = useState(true);
  const [firstCardID, setFirstCardID] = useState(null);

  return (
    <GameContext.Provider
      value={{
        score,
        increaseScore,
        load,
        setLoad,
        cards,
        setCards,
        firstCardID,
        setFirstCardID,
        cardsClickable,
        setCardsClickable,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
