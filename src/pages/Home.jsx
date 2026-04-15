import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-10 bg-pink-50">
      <h1 className="text-4xl font-bold text-pink-500">
        Welcome to Candy Land
      </h1>

      <Link to="/game">
        <button className="px-8 py-4 bg-pink-200 text-pink-800 font-bold rounded-xl shadow-lg hover:bg-pink-300 hover:scale-105 transition transform duration-200 ">
          Start Game
        </button>
      </Link>
    </div>
  );
}
