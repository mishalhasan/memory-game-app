import { useEffect } from "react";
import confetti from "canvas-confetti";

/**
 * Triggers confetti animation and returns boolean if a new best time was set.
 * Compares elapsedTime against bestTime from localStorage.
 */
export function useRecordCelebration(elapsedTime, bestTime) {
  // Check if newTime matches oldTime, if equal means new record
  const isNewRecord = elapsedTime === bestTime && elapsedTime > 0;

  useEffect(() => {
    if (isNewRecord) {
      confetti({
        particleCount: 150,
        spread: 80,
        colors: ["#F472B6", "#C084FC", "#93C5FD", "#FDE047"],
        origin: { y: 0.6 },
      });
    }
  }, [isNewRecord]);

  return isNewRecord;
}
