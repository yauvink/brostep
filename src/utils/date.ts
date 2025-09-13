export function isToday(timestamp: number): boolean {
  if (!timestamp || timestamp === 0) {
    return false;
  }

  const date = new Date(timestamp);
  const today = new Date(Date.now());

    // Convert to server timezone by adding the offset
    const serverDate = new Date(date.getTime() + (import.meta.env.VITE_TIMEZONE_UTC_OFFSET * 60 * 60 * 1000));
    const serverToday = new Date(today.getTime() + (import.meta.env.VITE_TIMEZONE_UTC_OFFSET * 60 * 60 * 1000));

    return (
      serverDate.getUTCDate() === serverToday.getUTCDate() &&
      serverDate.getUTCMonth() === serverToday.getUTCMonth() &&
      serverDate.getUTCFullYear() === serverToday.getUTCFullYear()
    );
}

export function formatTimeLeft(milliseconds: number): string {
  if (milliseconds <= 0) {
    return '0h 0m 0s';
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

export function getTimeUntilNextDailyReset(): number {
    const currentTime = Date.now();

    // Adjust current time to account for timezone offset
    const adjustedCurrentTime = new Date(currentTime + (import.meta.env.VITE_TIMEZONE_UTC_OFFSET * 60 * 60 * 1000));

    // Get the next midnight in server timezone
    const nextMidnight = new Date(adjustedCurrentTime);
    nextMidnight.setUTCHours(24, 0, 0, 0); // Set to next midnight UTC

    // Convert back to original timezone
    const nextMidnightInOriginalTimezone = new Date(nextMidnight.getTime() - (import.meta.env.VITE_TIMEZONE_UTC_OFFSET * 60 * 60 * 1000));

    return nextMidnightInOriginalTimezone.getTime() - currentTime;
}
