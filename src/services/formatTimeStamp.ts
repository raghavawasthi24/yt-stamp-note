export const formatTimestamp = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")} min ${String(
    remainingSeconds
  ).padStart(2, "0")} sec`;
};