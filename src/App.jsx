import { Routes, Route } from "react-router-dom";
import { GameContext } from "./context/GameContext";
import { GameProvider } from "./context/GameProvider";
import Home from "./pages/Home";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import Navbar from "./components/NavBar";


export default function App() {
  return (
    <>
      <Navbar />
      <GameProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game-over" element={<GameOver />} />
        </Routes>
      </GameProvider>
    </>
  );
}
