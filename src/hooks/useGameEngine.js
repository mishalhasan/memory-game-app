import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext.jsx";

import { fetchCandyLandPhotos } from "../api/cards.js";
import {
  prepareCards,
  isValidCard,
  toggleCardStatus,
  delay,
  shuffle,
} from "../utils/helpers.js";

export const useGameEngine = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [cards, setCards] = useState([]);
  const [cardsClickable, setCardsClickable] = useState(true);
  const [firstCardID, setFirstCardID] = useState(null);

  // const {
  //     cards,
  //     setCards,
  //     firstCardID,
  //     setFirstCardID,
  //     cardsClickable,
  //     setCardsClickable,
  //   } = useContext(GameContext);

  /*** GAME SETUP/END ***/

  /**
   * Loading initial images from Unsplash API
   */
  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchCandyLandPhotos(); // already processed
        const imgCards = prepareCards(result);
        if (imgCards) setCards(imgCards);
        console.log("imgCards", imgCards);
        console.log("cards", cards);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  /**
   * Boolean value for whether all matches found; signialing end of game.
   */
  const isGameOver = cards.length > 0 && cards.every((card) => card.isMatched);
  console.log("in game function", isGameOver);

  /*** HANDLE FUNCTIONS ***/

  const handleGameReset = () => {
    // let newCards = cards.map((card) => ({
    //   ...card,
    //   isFlipped: false,
    //   isMatched: false,
    // }));

    //newCards = shuffle(newCards);
    // setCards(shuffle(newCards));

    setCards((prevCards) => {
      //Setup newCards
      let newCards = prevCards.map((prevCard) => ({
        ...prevCard,
        isFlipped: false,
        isMatched: false,
      }));
      return shuffle(newCards);
    });
    
  };

  const handleCardClick = async (card) => {
    //ignore invalid cards/states where user already clicked card
    if (
      !cardsClickable ||
      card.isFlipped ||
      card.isMatched ||
      !isValidCard(card)
    )
      return;

    console.log("Clicked card:", card);

    setCardsClickable(false); // temporarily disable clicking

    console.log(card.uniqueID);

    //Update clicked card flipped status
    setCards((prevCards) =>
      toggleCardStatus(prevCards, card.uniqueID, "isFlipped", true),
    );

    //Check if card1 is selected or card 2 by user
    if (firstCardID === null) {
      console.log("testing card 1");

      //Add card as first pair of cardPair
      setFirstCardID(card.uniqueID);
    } else {
      console.log("card 2 testing");

      //Get firstCard data
      const firstCard = cards.find((card) => card.uniqueID === firstCardID);

      //check for match
      if (firstCard && card.imgID === firstCard.imgID) {
        //Update match status
        setCards((prevCards) => {
          const updatedCard1 = toggleCardStatus(
            prevCards,
            card.uniqueID,
            "isMatched",
            true,
          );

          const updatedCard2 = toggleCardStatus(
            updatedCard1,
            firstCardID,
            "isMatched",
            true,
          );

          return updatedCard2;
        });
      } else {
        await delay(1150);

        //Reset Cards: flip cards back
        setCards((prevCards) => {
          let updated = toggleCardStatus(
            prevCards,
            card.uniqueID,
            "isFlipped",
            false,
          );
          return toggleCardStatus(updated, firstCardID, "isFlipped", false);
        });
      }
      //Reset firstCardID - done last, after not being used anymore
      setFirstCardID(null);
    }

    setCardsClickable(true); // re-enable clicking after updating state
  };

  return {
    loading,
    error,
    cards,
    setCards,
    cardsClickable,
    setCardsClickable,
    firstCardID,
    setFirstCardID,
    handleCardClick,
    isGameOver,
    handleGameReset,
  };
};
