import "../utils/helpers.js";

export const fetchCandyLandPhotos = async () => {
  try {
    console.log(import.meta.env.VITE_API_URL);
    console.log(import.meta.env.VITE_API_KEY);
    const response = await fetch(import.meta.env.VITE_API_URL, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    //Clean Images Data
    let cleanData = processImages(data);

    return cleanData;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
};

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
      id,
      description,
      isFLipped: false,
      isMatched: false,
      photographer,
      profileUrl,
    });
    // }
  }

  return cleanImgData;
}

function duplicate(arr) {
  let duplicate = [...arr, ...arr];
  return duplicate;
}

export function prepareCards(imgs) {
  // Duplicate images to create matching pair cards
  let cards = [...imgs, ...imgs];

  return shuffle(cards);
}
