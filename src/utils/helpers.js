/**
 *Extracts & filters relevant Unsplash photo data, keeping only necessary fields; assumes images are near-square (no strict check).
 *Resizes images to 400x400 and appends UTM params to profile links for tracking.
 */
export function processImages(rawImgsData) {
  const cleanImgData = [];

  for (const img of rawImgsData) {
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

/**
 * Randomizes card order using random index swapping.
 */
export const shuffle = (cards) => {
  for (let index = 0; index < cards.length; index++) {
    const randomIndx = Math.floor(Math.random() * cards.length);
    const temp = cards[randomIndx];
    cards[randomIndx] = cards[index];
    cards[index] = temp;
  }

  return cards;
};

/**
 * Duplicates images to create pairs, assigns unique IDs,
 * and shuffles the final card array.
 */
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

/**
 * Toggles isFlipped or isMatched on a target card by uniqueID.
 * Throws if an invalid prop is passed.
 */
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

/**
 * Returns a promise that resolves after a given delay in ms.
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Formats milliseconds into mm:ss string with zero padding.
 */
export const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  let mins = Math.floor(totalSeconds / 60);
  let secs = totalSeconds % 60;

  //Add padding
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;

  return `${mins}:${secs}`;
};

/**
 * Saves elapsed time to localStorage if it's a new best.
 */
export const saveBestTime = (time) => {
  const stored = localStorage.getItem("bestTime");
  const best = stored === null ? Infinity : Number(stored);

  if (time < best) {
    localStorage.setItem("bestTime", String(time));
  }
};

/**
 * Retrieves best time from localStorage, returns 0 if none saved.
 */
export const getBestTime = () => {
  const stored = localStorage.getItem("bestTime");
  return stored === null ? 0 : Number(stored);
};

/**
 * Plays a sound effect from a given audio ref from the beginning.
 */
export const playSoundEffect = (soundRef) => {
  const audio = soundRef.current;
  audio.currentTime = 0;
  audio.volume = 0.7;
  audio.play();
};
