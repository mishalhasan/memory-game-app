// export const isValidCard = (val) =>
//   val !== "" && val !== null && val !== undefined && val !== false;

export const isValidCard = (card) =>
  card && card.uniqueID != null && card.uniqueID !== "";

export const shuffle = (cards) => {
  for (let index = 0; index < cards.length; index++) {
    const randomIndx = Math.floor(Math.random() * cards.length);
    const temp = cards[randomIndx];
    cards[randomIndx] = cards[index];
    cards[index] = temp;
  }

  return cards;
};

export function prepareCards(imgs) {
  // Duplicate images to create matching pair cards
  let cards = [...imgs, ...imgs];

  //Create unique-ID, add card parameters
  let idCounter = 0;
  cards = cards.map((card) => ({
    ...card,
    uniqueID: `card-${idCounter++}`,
    isFlipped: false,
    isMatched: false,
  }));

  return shuffle(cards);
}

export const toggleCardStatus = (prevCards, targetID, prop, propVal) => {
  const TOGGLEABLE_PROPS = ["isFlipped", "isMatched"];

  if (!TOGGLEABLE_PROPS.includes(prop)) {
    throw new Error(
      `Invalid prop "${prop}". Only "isFlipped" or "isMatched" can be toggled.`,
    );
  }

  return prevCards.map((prevCard) =>
    prevCard.uniqueID === targetID
      ? { ...prevCard, [prop]: propVal }
      : prevCard,
  );
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
