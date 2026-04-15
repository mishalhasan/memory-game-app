import { useState } from "react";
import { GameContext } from "./GameContext";
import { isValidCard } from "../utils/helpers";

// Create provider
export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const increaseScore = () => setScore((prev) => prev + 1);

  const [load, setLoad] = useState(false);
  const [cards, setCards] = useState([]);

  const [cardPair, setCardPair] = useState([null, null]);
  const fillCardSlot = (card) => {
    if (!isValidCard(card)) return; //ignore invalid cards chekc

    setCardPair((prev) => {
      const [first, second] = prev;
      if (first === null && second === null) {
        // Both slots empty → fill the first slot
        return [card, null];
      } else if (first !== null && second === null) {
        // First filled, second empty → fill the second slot
        return [first, card];
      } else if (first !== null && second !== null) {
        // Both filled → reset
        return [null, null];
      }

      return prev; //fallback, should not happen
    });
  };

  return (
    <GameContext.Provider
      value={{
        score,
        increaseScore,
        load,
        setLoad,
        cards,
        setCards,
        cardPair,
        fillCardSlot,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
