import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export function useGameNavigation() {
  const navigate = useNavigate();
  const { handleGameReset } = useContext(GameContext);

  const goHome = () => {
    navigate("/");
  };

  const restartGame = () => {
    handleGameReset();
    navigate("/game");
  };

  return {
    goHome,
    restartGame,
  };
}
