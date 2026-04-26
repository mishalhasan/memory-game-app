# Candy Memory Game 🍬

A responsive candy-themed memory card game featuring card reveal animations, sound effects, background music, and live scoring. Players match pairs and try to beat their best time.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

## Features

- 🃏 18 randomized candy-themed cards fetched from the Unsplash API
- ⏱️ Live timer and move counter
- 🏆 Best time saved to local storage
- 🔊 Background music with mute toggle
- ⏸️ Pause and resume mid-game
- 📱 Responsive layout for mobile and desktop
- 🎵 Sound effects on card flip and match
- 🎉 Confetti celebration on new best time

---

## 🛠️ Tech Stack

- React (Hooks, Context API)
- React Router
- Tailwind CSS
- Vite
- Unsplash API
- Google Fonts (Dancing Script, Poppins, Inter)
- Material Symbols

---

## Getting Started

### Prerequisites

- Node.js installed on your machine
- An Unsplash API access key

> An Unsplash API key is required to load images. You can generate one by signing up as a developer at https://unsplash.com/developers.

### Installation

1. Clone the repository

```bash
git clone https://github.com/mishalhasan/candy-memory-game
cd candy-memory-game
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Unsplash API key

```bash
VITE_API_KEY=your_unsplash_access_key_here
VITE_API_URL=https://api.unsplash.com/photos/random?collections=aiwLo0Esrfo&count=9
```

> **Note:** Changing the count parameter affects layout. The game is optimized for 9 pairs (18 cards).

4. Start the development server

```bash
npm run dev
```

## How to Play

1. Click **Start Game** on the home page
2. Flip two cards by clicking them — matching pairs stay revealed
3. Find all 9 pairs to win
4. Use the footer controls to pause, mute, or return home mid-game

## Project Structure

```
src/
├── api/              # Unsplash API fetching
├── assets/
│   ├── audio/        # Background music
│   └── imgs/         # Background images
├── components/       # UI components (Card, GameBoard, Header, Footer, etc.)
├── context/          # GameContext and GameProvider
├── hooks/            # useGameEngine, useGameEnd, useGameNavigation
├── pages/            # Home, Game, GameOver
└── utils/            # Helper functions
```

## Tailwind Configuration

Custom fonts and staggered bounce animations are configured in `tailwind.config.js`:

```js
theme: {
  extend: {
    animation: {
      bounce1: "bounce 1s 0.5s infinite",
      bounce2: "bounce 1s 0.65s infinite",
      bounce3: "bounce 1s 0.8s infinite",
    },
    fontFamily: {
      cursive: ['"Dancing Script"', "cursive"],
      emphasis: ["Poppins", "sans-serif"],
      body: ["Inter", "sans-serif"],
    },
  },
},
```

---

## 📝 Notes

- **API usage:** If images fail to load, check your API key and Unsplash rate limits.
- **Browser support:** This app is built for modern browsers (Chrome, Firefox, Safari, Edge). Internet Explorer is not supported.

---

## Credits

- Background music: [freesound.org](https://freesound.org/s/738853/) — License: Creative Commons 0
- Flip sound: [freesound.org](https://freesound.org/s/506054/) by Mellau — License: Attribution NonCommercial 4.0
- Match sound: [freesound.org](https://freesound.org/s/243701/) by ertfelda — License: Creative Commons 0
- Card images: [Unsplash](https://unsplash.com) — Attribution included per image via API metadata
- Landing page imagery: Google Gemini (AI-generated)
