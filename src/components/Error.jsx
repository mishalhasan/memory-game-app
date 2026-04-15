import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-5">
        <p className="text-lg text-pink-700">
          Something went wrong. Please try again later.
        </p>
        <button
          className="w-fit px-6 py-3 bg-blue-300 text-pink-100 font-bold rounded-xl shadow-lg hover:bg-pink-300 hover:scale-105 transition transform duration-200"
          onClick={handleHome}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
