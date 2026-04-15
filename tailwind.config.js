/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        bounce1: "bounce 1s 0.5s infinite",
        bounce2: "bounce 1s 0.65s infinite",
        bounce3: "bounce 1s 0.8s infinite",
      },
    },
  },
  plugins: [],
};
