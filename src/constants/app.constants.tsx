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
  LEVEL_UP = "lu",
  UNKNOWN = "unknown",
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

const LEVEL_COLORS = [
  "#9CA3AF", // Beginner - Gray
  "#10B981", // Noob - Green
  "#3B82F6", // Rookie - Blue
  "#8B5CF6", // Veteran - Purple
  "#F59E0B", // Legendary - Amber
  "#EF4444", // Savage - Red
  "#EC4899", // Dominator - Pink
  "#DC2626", // Maniac - Dark Red
  "#7C3AED", // Lucky One - Violet
  "#1F2937", // Immortal - Dark Gray
  "#FFD700", // Intergalactic - Gold
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

/**
 * Get level color by user level
 * @param level - User's level (0-10)
 * @returns Level color hex string
 */
export function getLevelColorByLevel(level: number): string {
  if (level < 0 || level >= LEVEL_COLORS.length) {
    return LEVEL_COLORS[0]; // Return beginner color for invalid levels
  }
  return LEVEL_COLORS[level];
}

/**
 * Calculate percentage progress within current level
 * @param score - User's current score
 * @returns Percentage (0-100) of progress within current level
 */
export function getCurrentLevelProgress(score: number): number {
  const currentLevel = getUserLevelByScore(score);
  const currentLevelScore = LEVEL_MAP[currentLevel as keyof typeof LEVEL_MAP];

  // If user is at max level, return 100%
  if (currentLevel >= 10) {
    return 100;
  }

  const nextLevelScore =
    LEVEL_MAP[(currentLevel + 1) as keyof typeof LEVEL_MAP];
  const levelRange = nextLevelScore - currentLevelScore;
  const progressInLevel = score - currentLevelScore;

  // Calculate percentage, ensuring it doesn't exceed 100%
  const percentage = Math.min((progressInLevel / levelRange) * 100, 100);

  return Math.max(0, Math.round(percentage));
}
