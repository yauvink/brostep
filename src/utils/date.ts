export function isToday(timestamp: number, serverTime?: number, serverTimezoneOffset?: number): boolean {
  if (!timestamp || timestamp === 0) {
    return false;
  }

  const date = new Date(timestamp);
  const today = new Date(serverTime || Date.now());

  // If server timezone offset is provided, adjust the dates to server timezone
  if (serverTimezoneOffset !== undefined) {
    // Convert to server timezone by adding the offset
    const serverDate = new Date(date.getTime() + (serverTimezoneOffset * 60 * 1000));
    const serverToday = new Date(today.getTime() + (serverTimezoneOffset * 60 * 1000));

    return (
      serverDate.getUTCDate() === serverToday.getUTCDate() &&
      serverDate.getUTCMonth() === serverToday.getUTCMonth() &&
      serverDate.getUTCFullYear() === serverToday.getUTCFullYear()
    );
  }

  // Fallback to original logic if no timezone offset provided
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
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

export function getTimeUntilNextDailyReset(serverTime: number, serverTimezoneOffset?: number): number {
  const serverDate = new Date(serverTime);

  if (serverTimezoneOffset !== undefined) {
    // Adjust server time to account for timezone offset
    const adjustedServerTime = new Date(serverTime + (serverTimezoneOffset * 60 * 1000));

    // Get the next midnight in server timezone
    const nextMidnight = new Date(adjustedServerTime);
    nextMidnight.setUTCHours(24, 0, 0, 0); // Set to next midnight UTC

    // Convert back to original timezone
    const nextMidnightInOriginalTimezone = new Date(nextMidnight.getTime() - (serverTimezoneOffset * 60 * 1000));

    return nextMidnightInOriginalTimezone.getTime() - serverTime;
  }

  // Fallback to original logic if no timezone offset provided
  const nextMidnight = new Date(serverDate);
  nextMidnight.setUTCHours(24, 0, 0, 0); // Set to next midnight UTC

  return nextMidnight.getTime() - serverTime;
}
