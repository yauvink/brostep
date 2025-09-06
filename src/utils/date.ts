/**
 * Checks if a given timestamp is from today
 * @param timestamp - Unix timestamp in milliseconds
 * @returns true if the timestamp is from today, false otherwise
 */
export function isToday(timestamp: number): boolean {
  if (!timestamp || timestamp === 0) {
    return false;
  }

  const date = new Date(timestamp);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
