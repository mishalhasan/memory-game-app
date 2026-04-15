export const isValidCard = (val) =>
  val !== "" && val !== null && val !== undefined && val !== false;

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
  if (!imgs) return null; 
  
  // Duplicate images to create matching pair cards
  let cards = [...imgs, ...imgs];

  return shuffle(cards);
}
