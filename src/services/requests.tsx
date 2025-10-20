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

export interface StatsUser {
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
  user: StatsUser;
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

export const leaveGameRoom = (gameRoomId: string): Promise<AxiosResponse<void>> => {
  console.log('leaveGameRoom', gameRoomId);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       data: { success: true } as any,
  //       status: 200,
  //       statusText: 'OK',
  //       headers: {},
  //       config: {} as any,
  //     });
  //   }, 2000);
  // });
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject({
        isAxiosError: true,
        response: {
          data: { message: 'You can`t leave now, coming soon...' },
          status: 500,
          statusText: 'Internal Server Error',
          headers: {},
          config: {} as any,
        },
        message: 'Mocked leaveGameRoom error',
        config: {} as any,
      });
    }, 1000);
  });
};

// Payment Types and Functions

export interface CreateInvoiceRequest {
  title: string;
  description: string;
  payload: string;
  amount: number;
}

export interface CreateInvoiceResponse {
  invoiceLink: string;
}

export interface CreateInvoiceLinkPayload {
  title: string;
  description: string;
  payload: string;
  currency: string;
  prices: Array<{
    label: string;
    amount: number;
  }>;
}

export class PaymentError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'PaymentError';
  }
}

export async function createInvoiceLink(product: CreateInvoiceRequest): Promise<string> {
  try {
    const response: AxiosResponse<CreateInvoiceResponse> = await http.post(
      `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/payments/create-invoice-link`,
      {
        title: product.title,
        description: product.description,
        payload: product.payload,
        currency: 'XTR',
        prices: [
          {
            label: product.title,
            amount: product.amount,
          },
        ],
      }
    );

    return response.data.invoiceLink;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new PaymentError('Unauthorized. Please log in again.', 401);
      }
      if (error.response.status === 400) {
        throw new PaymentError('Invalid payment data.', 400);
      }
      throw new PaymentError('Failed to create payment.', error.response.status);
    }
    throw new PaymentError('Network error. Please check your connection.');
  }
}
