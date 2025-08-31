import axios, { type AxiosResponse } from 'axios';

interface GetUserRequest {
  telegram_id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_premium: boolean;
  photo_url?: string;
  ref_code?: string;
}

export interface GetUserResponse {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  is_premium: boolean;
  telegram_id: number;
  photo_url: string | null;
  ref_code: string | null;
  createdAt: string;
  updatedAt: string;
}

export const getUser = ({
  telegram_id,
  username,
  last_name,
  first_name,
  is_premium,
  photo_url,
  ref_code,
}: GetUserRequest): Promise<AxiosResponse<GetUserResponse>> => {
  const url = import.meta.env.VITE_API_ENDPOINT;

  return axios.post(
    url + '/user',
    {
      telegram_id,
      username,
      last_name,
      first_name,
      is_premium,
      photo_url,
      ref_code,
    }
    // {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }
  );
};

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
}
