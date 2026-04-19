// import { Link } from "react-router-dom";
// import { GameContext } from "../context/GameContext.jsx";
// import { useContext } from "react";

// export default function GameOver() {
//   const { handleGameReset } = useContext(GameContext);

//   return (
//     <div className="flex flex-col gap-10 h-screen items-center justify-center bg-pink-50">
//       <h1 className="text-4xl font-bold text-pink-500">Game Over</h1>
//       <div className=" flex gap-3 ">
//         <Link to="/game">
//           <button
//             onClick={handleGameReset}
//             className="px-6 py-3 rounded-lg bg-pink-500 text-white font-bold"
//           >
//             Play Again
//           </button>
//         </Link>
//         <Link to="/">
//           <button className="px-6 py-3 rounded-lg bg-white text-pink-400 font-bold">
//             Return Home
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

import { useGameNavigation } from "../hooks/useGameNavigation";

export default function GameOver() {
  const { goHome, restartGame } = useGameNavigation();

  return (
    <div className="flex flex-col gap-10 h-screen items-center justify-center bg-pink-50">
      <h1 className="text-4xl font-bold text-pink-500">Game Over</h1>

      <div className="flex gap-3">
        <button
          onClick={restartGame}
          className="px-6 py-3 rounded-lg bg-pink-500 text-white font-bold"
        >
          Play Again
        </button>

        <button
          onClick={goHome}
          className="px-6 py-3 rounded-lg bg-white text-pink-400 font-bold"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
