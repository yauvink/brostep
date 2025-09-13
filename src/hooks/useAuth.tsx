import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { authenticate, renewRefreshToken, renewAccessToken } from '../services/requests.tsx';
import { useError } from '../providers/ErrorProvider/useError.ts';
import { STORAGE_KEYS } from '../constants/storage.tsx';
import { http, createBearerTokenInterceptor } from '../http';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean;
  isLoading: boolean;
  hasError: boolean;
}

export const DEFAULT_AUTH_STATE: AuthState = {
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  hasError: false,
  authenticated: false,
}

export const useAuth = (initData: string | null) => {
  const { setAppError } = useError();
  const [authState, setAuthState] = useState<AuthState>(DEFAULT_AUTH_STATE);

  const setStateWithLocalStorage = (newState: Partial<AuthState>) => {
    if (newState.accessToken) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN_KEY, newState.accessToken);
    if (newState.refreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN_KEY, newState.refreshToken);

    setAuthState((prev) => ({ ...prev, ...newState }));
  }

  const checkAuth = async (initData: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data } = await getTokens(initData);

      setStateWithLocalStorage({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        authenticated: true,
        isLoading: false,
        hasError: false,
      });

      const tokenProvider = async (): Promise<string> => {
        const newAccessToken = await updateAccessToken();
        setStateWithLocalStorage({ accessToken: newAccessToken });
        return newAccessToken;
      };

      http.interceptors.request.use(createBearerTokenInterceptor(tokenProvider, import.meta.env.VITE_API_BACKEND_ENDPOINT, `${import.meta.env.VITE_API_BACKEND_ENDPOINT}/api/auth`));
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        hasError: true,
      }));

      if (error instanceof AxiosError) {
        if (error?.response?.data) {
          setAppError(JSON.stringify(error.response.data));
        }
      }
    }
  };

  useEffect(() => {
    if (initData) {
      checkAuth(initData);
    }
  }, [initData]);

  return { authState };
};

async function getTokens(initData: string) {
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN_KEY);

  try {
    if (refreshToken) return await renewRefreshToken(refreshToken);
    return authenticate(initData);
  } catch {
    return authenticate(initData);
  }
}

let renewAccessTokenPromise: null|Promise<string> = null;
const MIN_VALIDITY = 1000 * 60;

async function updateAccessToken(): Promise<string> {
  if (renewAccessTokenPromise) return renewAccessTokenPromise;

  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN_KEY)

  if (!accessToken || !refreshToken) {
    throw new Error('access token or refresh token is not available');
  }

  const decodedAccessToken = jwtDecode(accessToken);

  if (!decodedAccessToken.exp) {
    throw new Error('access token expiration date is not available');
  }

  const expirationDate: Date = new Date(decodedAccessToken.exp * 1000 - MIN_VALIDITY);
  const isExpired = expirationDate.getTime() < Date.now();

  if (!isExpired) return accessToken;
  if (renewAccessTokenPromise !== null) return renewAccessTokenPromise;

  renewAccessTokenPromise = renewAccessToken(refreshToken).then(({ data }) => {
    renewAccessTokenPromise = null;
    return data.accessToken;
  });


  return renewAccessTokenPromise;
}
