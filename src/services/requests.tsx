import axios, { type AxiosResponse } from 'axios';

export interface TokenPairResponse {
  accessToken: string;
  refreshToken: string;
}

export const authenticate = (initData: string): Promise<AxiosResponse<TokenPairResponse>> => {
  const url = `${import.meta.env.VITE_API_ENDPOINT}/auth`;
  return axios.post(url, { initData });
};

export const renewRefreshToken = (refreshToken: string): Promise<AxiosResponse<TokenPairResponse>> => {
  const url = `${import.meta.env.VITE_API_ENDPOINT}/auth/tokens/renew/refresh`;
  return axios.post(url, { refreshToken });
};
