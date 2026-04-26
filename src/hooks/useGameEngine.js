import { useState, useEffect, useRef } from "react";
import { fetchCandyLandPhotos } from "../api/cards.js";
import bgAudio from "../assets/audio/candy-bg.mp3";
import flipAudio from "../assets/audio/click.mp3";
import matchAudio from "../assets/audio/matched.wav";

import {
  prepareCards,
  isValidCard,
  toggleCardStatus,
  playSoundEffect,
  delay,
  shuffle,
} from "../utils/helpers.js";

export const useGameEngine = () => {
  /*** Initialize state variables ***/

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardsClickable, setCardsClickable] = useState(true);
  const [firstCardID, setFirstCardID] = useState(null);
  const [moves, setMoves] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState("idle"); //'idle', 'playing', 'paused', 'ended'
  const [audioMute, setAudioMute] = useState(false);

  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(bgAudio));
  const flipSoundRef = useRef(new Audio(flipAudio));
  const matchSoundRef = useRef(new Audio(matchAudio));

  /*** GAME SETUP/END ***/

  /*
   * Loading game data on initial page load
   */
  useEffect(() => {
    loadData();
  }, []);

  /**
   * Fetches candy land photos from Unsplash API.
   * Sets error state if request fails.
   */
  async function loadData() {
    try {
      //ensure API state initalized to default value
      setLoading(true);
      setError(false);

      const result = await fetchCandyLandPhotos(); // already processed
      const imgCards = prepareCards(result);
      if (imgCards) setCards(imgCards);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Boolean value for whether all matches found; signialing end of game.
   */
  const isGameOver = cards.length > 0 && cards.every((card) => card.isMatched);

  /*** TIMER FUNCTIONS ***/

  /**
   * Starts/stops timer interval based on game state.
   * Clears interval on pause or when startTimestamp is null.
   */
  useEffect(() => {
    if (startTimestamp !== null && gameState === "playing") {
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTimestamp;
        setElapsedTime(elapsed);
      }, 1000); // runs every 1000ms (1 second)
    }

    if (startTimestamp === null || gameState === "paused") {
      clearInterval(intervalRef.current);
    }
  }, [startTimestamp, gameState]);

  /**
   * Starts timer, updates game state, and resumes music.
   * Guard ensures this only fires on first card click.
   */
  const handleGameBegin = () => {
    if (startTimestamp !== null) return; // already running
    setStartTimestamp(Date.now());
    setGameState("playing");
    audioRef.current.play();
    audioRef.current.volume = 0.1;
  };

  /*** HANDLE FUNCTIONS ***/

  /** Audio Functions **/

  /**
   * Stops background music and resets to beginning.
   */
  const handleStopBgMusic = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  /**
   * Toggles mute state of background music and sound effects.
   */
  const handleMute = () => {
    setAudioMute((prev) => {
      const newMuted = !prev;
      audioRef.current.muted = newMuted;
      flipSoundRef.current.muted = newMuted;
      matchSoundRef.current.muted = newMuted;
      return newMuted;
    });
  };

  /**
   * Plays background music from beginning at low volume.
   * Resets mute state as defensive check.
   */
  const handlePlayBgMusic = () => {
    const audio = audioRef.current;
    audio.currentTime = 0; //always start from beginning
    audio.play();
    audio.volume = 0.1;
    audio.loop = true;
    setAudioMute(false); //defensive check, ensures, audio is not muted
  };

  /** Game Start Functions **/

  /**
   * Resets cards to unflipped/unmatched state and shuffles.
   * Calls resetGameBoard to clear all game state.
   */
  const handleGameReset = () => {
    setCards((prevCards) => {
      //Setup newCards
      let newCards = prevCards.map((prevCard) => ({
        ...prevCard,
        isFlipped: false,
        isMatched: false,
      }));
      return shuffle(newCards);
    });

    resetGameBoard();
  };

  /**
   * Retries API call on error and resets game board.
   */
  const handleAPIReset = async () => {
    await loadData();
    resetGameBoard();
  };

  /**
   * Resets all game board state to default values.
   * Called on game reset and API retry.
   */
  const resetGameBoard = () => {
    setElapsedTime(0);
    setMoves(0);
    setStartTimestamp(null);
    setGameState("playing");
    setCardsClickable(true);
    audioRef.current.muted = false;
    matchSoundRef.current.muted = false;
    flipSoundRef.current.muted = false;
  };

  /**
   * Toggles between paused and playing game state.
   * Cannot pause before timer has started.
   */
  const handleGameState = () => {
    //If innitial game i.e. actual timer has not began cannot start/stop timer
    if (startTimestamp === null) return;
    cardsClickable ? setCardsClickable(false) : setCardsClickable(true);

    //Toggle between paused and playing game state
    if (gameState === "playing") setGameState("paused");
    else if (gameState === "paused") {
      //Reset start time to avoid time jump when resuming
      setStartTimestamp(Date.now() - elapsedTime);
      setGameState("playing");
    }
  };

  /**
   * Resets game if returning to home after completion.
   * Prevents stale game state on re-entry.
   */
  const handleGameStart = () => {
    if (isGameOver) handleGameReset();
  };

  /** Game End Functions**/

  /**
   * Stops timer, updates game state to ended, and stops music.
   * Triggered when all card matches are found.
   */
  const handleGameEnd = () => {
    setStartTimestamp(null); // stops timer
    setGameState("ended"); // updates game state
    handleStopBgMusic(); // stops audio
  };

  /*** CORE Game Logic  ***/

  /**
   * Handles card selection logic for matching pairs.
   * Manages flip state, match checking, move counter, and sound effects.
   */
  const handleCardClick = async (card) => {
    //ignore invalid cards/states where user already clicked card
    if (
      !cardsClickable ||
      card.isFlipped ||
      card.isMatched ||
      !isValidCard(card)
    )
      return;

    //Play flip sound
    playSoundEffect(flipSoundRef);

    //On first click ensuures timer started, update game state, ensure music on
    handleGameBegin();

    setCardsClickable(false); // temporarily disable clicking

    //Increment # of moves
    setMoves((prev) => prev + 1);

    //Update clicked card flipped status
    setCards((prevCards) =>
      toggleCardStatus(prevCards, card.uniqueID, "isFlipped", true),
    );

    //Check if card1 is selected or card 2 by user
    if (firstCardID === null) {
      //Add card as first pair of cardPair
      setFirstCardID(card.uniqueID);
    } else {
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

        //Play audio on successful match
        playSoundEffect(matchSoundRef);
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
    cardsClickable,
    handleCardClick,
    isGameOver,
    handleGameReset,
    moves,
    elapsedTime,
    handleGameStart,
    handleAPIReset,
    gameState,
    handleGameState,
    handlePlayBgMusic,
    handleMute,
    audioMute,
    handleStopBgMusic,
    handleGameEnd,
  };
};
