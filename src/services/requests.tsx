import axios, { type AxiosResponse } from 'axios';

export interface TokenPairResponse {
  accessToken: string;
  refreshToken: string;
}

export const authenticate = (initData: string): Promise<AxiosResponse<TokenPairResponse>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/auth`;
  return axios.post(url, { initData });
};

export const renewRefreshToken = (refreshToken: string): Promise<AxiosResponse<TokenPairResponse>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/auth/tokens/renew/refresh`;
  return axios.post(url, { refreshToken });
};

export const getRooms = (accessToken: string): Promise<AxiosResponse<Array<{ id: string; title: string }>>> => {
  const url = `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/rooms`;
  return axios.post(url, { token: accessToken });
};
