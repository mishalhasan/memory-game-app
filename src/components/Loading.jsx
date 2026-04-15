export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center z-50">
      <div className="">
        <h1 className="text-4xl font-bold text-pink-600 animate-pulse">
          Candyland Loading{" "}
          <span className="text-xl inline-block animate-bounce1">🍬</span>
          <span className="text-xl inline-block animate-bounce2">🍬</span>
          <span className="text-xl inline-block animate-bounce3">🍬</span>
        </h1>
      </div>
    </div>
  );
}
