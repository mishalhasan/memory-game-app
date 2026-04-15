import { createContext } from "react";

export const GameContext = createContext({
  score: 0, // default value
  cardPair: [null, null],
  load: false,
  cards: [],
  setScore: () => {},
  setcardPair: () => {},
  setLoad: () => {},
  setCards: () => {},
});
