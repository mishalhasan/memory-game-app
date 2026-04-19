export default function Card({ card, handleCardClick, cardsClickable }) {
  // const opacity = card.isFlipped ? "opacity-0" : "opacity-100";

  const opacity = card.isFlipped ? "opacity-100" : "opacity-0";
  const interactionStateView = cardsClickable
    ? "cursor-pointer hover:scale-105"
    : "cursor-not-allowed";

  return (
    <div
      inert={!cardsClickable}
      // className="w-full sm:w-40 md:w-48 min-w-[100px] max-w-[150px] aspect-square"
      //className="w-[140px] sm:w-[150px] aspect-square"
      className={`select-none w-full min-w-[130px] max-w-[150px] aspect-square bg-rose-50 rounded-lg transition-transform ${interactionStateView}`}
      //className="w-full min-w-[100px] max-w-[150px] aspect-square"
      data-description={card.description}
      data-photographer={card.photographer}
      data-photographer-link={card.profileUrl}
      role="group"
      aria-label={`Photo by ${card.photographer}: ${card.description}`}
      onMouseDown={() => handleCardClick(card)}
    >
      <img
        //opacity-0 hover:opacity-100
        className={`w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-200 ${opacity}`}
        src={card.imgUrl}
        alt={card.description}
        draggable={false}
      />
    </div>
  );
}
