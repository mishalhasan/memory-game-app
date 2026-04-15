import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext.jsx";

export default function Card({ card }) {
  const { setCards, cards } = useContext(GameContext);
  return (
    <div
      // className="w-full sm:w-40 md:w-48 min-w-[100px] max-w-[150px] aspect-square"
      //className="w-[140px] sm:w-[150px] aspect-square"
      className="w-full min-w-[130px] max-w-[150px] aspect-square bg-rose-50 rounded-lg transition-transform hover:scale-105"
      //className="w-full min-w-[100px] max-w-[150px] aspect-square"
      data-description={card.description}
      data-photographer={card.photographer}
      data-photographer-link={card.profileUrl}
      role="group"
      aria-label={`Photo by ${card.photographer}: ${card.description}`}
    >
      <img
        className="w-full h-full object-cover rounded-lg shadow-md opacity-0 transition-opacity duration-300 hover:opacity-100"
        src={card.imgUrl}
        alt={card.description}
      />
    </div>
  );
}
