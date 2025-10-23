export const APP_VIEW = {
  MAIN: "MAIN",
  PROFILE: "PROFILE",
};

export const ALLOWED_PLATFORMS = ["ios", "android"];

export const DEFAULT_GRADIENT =
  "linear-gradient(135deg, #d6defd 0%, #e0c8f0 100%)";

export enum GameMessageType {
  DETECT_START = "ds",
  DETECT_FINISHED = "df",
  JOIN_GAME = "jg",
}

export enum LanguageCode {
  RU = "ru",
  EN = "en",
}

export enum UserMark {
  SHIELD = "shield",
  SERVER_HELPER = "server_helper",
}

const LEVEL_MAP = {
  0: 0,
  1: 3,
  2: 10,
  3: 44,
  4: 90,
  5: 180,
  6: 270,
  7: 666,
  8: 777,
  9: 1000,
  10: 5000,
};

const LVL_NAMES = [
  "Beginner",
  "Noob",
  "Rookie",
  "Veteran",
  "Legendary",
  "Savage",
  "Dominator",
  "Maniac",
  "Lucky One",
  "Immortal",
  "Intergalactic",
];

/**
 * Get user level based on their score
 * @param score - User's score
 * @returns User's level (0-10)
 */
export function getUserLevelByScore(score: number): number {
  for (let level = 10; level >= 0; level--) {
    if (score >= LEVEL_MAP[level as keyof typeof LEVEL_MAP]) {
      return level;
    }
  }
  return 0;
}

/**
 * Get level name by user level
 * @param level - User's level (0-10)
 * @returns Level name string
 */
export function getLevelNameByLevel(level: number): string {
  if (level < 0 || level >= LVL_NAMES.length) {
    return LVL_NAMES[0]; // Return "Beginner" for invalid levels
  }
  return LVL_NAMES[level];
}
