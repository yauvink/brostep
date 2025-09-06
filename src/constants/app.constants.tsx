export const APP_VIEW = {
  MAIN: 'MAIN',
  PROFILE: 'PROFILE',
  LEADERBOARD: 'LEADERBOARD',
};

export const ALLOWED_PLATFORMS = ['ios', 'android'];

export enum GameMessageType {
  DETECT_START = 'ds',
  DETECT_FINISHED = 'df',
  JOIN_GAME = 'jg',
}
