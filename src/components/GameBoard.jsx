import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext.jsx";
import Card from "./Card.jsx";
import { useGameLogic } from "../hooks/useGameLogic.js";

export default function GameBoard() {
  const { cards } = useContext(GameContext);
  const { handleCardClick, cardsClickable } = useGameLogic();

  return (
    //<main className="min-h-screen w-full flex justify-center py-8 px-4">
    <main className="w-full flex justify-center px-10 ">
      <div
        className="
   rounded-2xl flex flex-wrap justify-center gap-4 h-fit w-full lg:grid lg:grid-cols-6 lg:justify-items-center max-w-[1600px] lg:mx-auto "
      >
        {/* <main className="mx-4 sm:mx-6 md:mx-10 py-3 md:py-6 bg-pink-100 overflow-auto min-w-[320px] max-w-full">
     <main className="min-h-screen w-full flex justify-center py-8 px-4 sm:px-6"> */}
        {/* <div className="bg-pink-200/30 p-4 sm:p-6 rounded-2xl flex flex-wrap justify-center gap-4 md:gap-14 lg:gap-4 lg:grid lg:grid-cols-6 w-full max-w-4xl lg:w-auto lg:max-w-none h-fit"> */}
        {/* <div className="flex flex-wrap justify-center gap-6 lg:grid lg:grid-cols-6 lg:px-6 "> */}
        {cards.map((card) => (
          // <div className=" min-w-[100px] basis-[150px] lg:flex-none lg:w-auto mx-auto md:mx-0 lg:mx-0">
          <Card
            key={card.uniqueID}
            card={card}
            handleCardClick={handleCardClick}
            cardsClickable={cardsClickable}
          />
          // </div>
        ))}
      </div>
    </main>

    // <main className="flex-1 p-4 max-h-[75vh] sm:max-h-full overflow-auto bg-red-200">
    //   <div className=" grid-cols-3 sm:grid-cols-4 gap-4 inline-grid justify-center">
    //     {cards.map((card, index) => (
    //       <Cards key={`${card.id}-${index}`} card={card} />
    //     ))}
    //   </div>
    // </main>
  );
}
