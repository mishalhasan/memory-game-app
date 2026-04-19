// export const isValidCard = (val) =>
//   val !== "" && val !== null && val !== undefined && val !== false;

/*
 * Filters out unnecessary data and only keeps relevant photo data with relevant changes
 */
export function processImages(rawImgsData) {
  const cleanImgData = [];

  for (const img of rawImgsData) {
    // if (img.width === img.height) {
    // Grab raw URL and resize to 400x400
    const imgUrl = `${img.urls.raw}&w=400&h=400`;

    //Grab photo info
    const id = img.id;
    const description = img.alt_description;

    // Get photographer info + profile link with UTM parameters
    const photographer = img.user.name;
    const profileUrl = `${img.user.links.html}?utm_source=your_app_name&utm_medium=referral`;

    cleanImgData.push({
      imgUrl,
      imgID: id,
      description,
      photographer,
      profileUrl,
    });
    // }
  }

  return cleanImgData;
}

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

