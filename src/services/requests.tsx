import type { AxiosResponse } from 'axios';
import { http } from '../http';
import { LanguageCode } from '../constants/app.constants';

export interface AccessTokenResponse {
  accessToken: string;
}

export interface TokenPairResponse {
  accessToken: string;
  refreshToken: string;
}

export const authenticate = (initData: string): Promise<AxiosResponse<TokenPairResponse>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/auth`;
  return http.post(url, { initData });
};

export const renewAccessToken = (refreshToken: string): Promise<AxiosResponse<AccessTokenResponse>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/auth/tokens/renew/access`;
  return http.post(url, { refreshToken });
};

export const renewRefreshToken = (refreshToken: string): Promise<AxiosResponse<TokenPairResponse>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/auth/tokens/renew/refresh`;
  return http.post(url, { refreshToken });
};

export const getGames = (): Promise<AxiosResponse<Array<{ id: string; chatTitle: string }>>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/games`;
  return http.get(url);
};

export interface UpdateLanguageRequest {
  languageCode: LanguageCode;
}

export interface UpdateLanguageResponse {
  languageCode: LanguageCode;
}

export const getUserLanguage = (): Promise<AxiosResponse<UpdateLanguageResponse>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/users/language`;
  return http.get(url);
};

export const updateUserLanguage = (languageCode: LanguageCode): Promise<AxiosResponse<UpdateLanguageResponse>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/users/language`;
  return http.put(url, { languageCode });
};

// Statistics
export interface User {
  id: string;
  telegramId: number;
  telegramUsername?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  languageCode: string;
  marks: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameScore {
  user: User;
  score: number;
}

export type GameScoresResponse = GameScore[];

export enum GameScoreType {
  TOTAL = 'total',
  YEARLY = 'yearly',
  MONTHLY = 'monthly',
  WEEKLY = 'weekly',
}

export interface StatisticsParams {
  type?: GameScoreType;
  year?: number;
  month?: number;
  week?: number;
}

export const getTotalStats = (gameId: string): Promise<AxiosResponse<GameScoresResponse>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/games/${gameId}/scores?type=total`;
  return http.get(url);
};

export const getYearlyStats = (gameId: string, year: number): Promise<AxiosResponse<GameScoresResponse>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/games/${gameId}/scores?type=yearly&year=${year}`;
  return http.get(url);
};

export const getMonthlyStats = (
  gameId: string,
  year: number,
  month: number
): Promise<AxiosResponse<GameScoresResponse>> => {
  const url = `${
    import.meta.env.VITE_API_BACKEND_ENDPOINT
  }/api/games/${gameId}/scores?type=monthly&year=${year}&month=${month}`;
  return http.get(url);
};

export const getWeeklyStats = (
  gameId: string,
  year: number,
  week: number
): Promise<AxiosResponse<GameScoresResponse>> => {
  const url = `${
    import.meta.env.VITE_API_BACKEND_ENDPOINT
  }/api/games/${gameId}/scores?type=weekly&year=${year}&week=${week}`;
  return http.get(url);
};
