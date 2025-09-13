import type { AxiosResponse } from 'axios';
import { http } from '../http';

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
