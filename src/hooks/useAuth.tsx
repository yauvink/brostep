import { useEffect, useState } from 'react';
import { authenticate, renewRefreshToken } from '../services/requests.tsx';
import { useError } from '../providers/ErrorProvider/useError.ts';
import { STORAGE_KEYS } from '../constants/storage.tsx';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  hasError: boolean;
}

export const DEFAULT_AUTH_STATE: AuthState = {
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  hasError: false,
}

export const useAuth = (initData: string | null) => {
  const { setAppError } = useError();
  const [authState, setAuthState] = useState<AuthState>(DEFAULT_AUTH_STATE);

  const updateTokens = async (initData: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    getTokens(initData)
      .then((res) => {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN_KEY, res.data.refreshToken);
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN_KEY, res.data.accessToken);
        setAuthState({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          isLoading: false,
          hasError: false,
        });
      })
      .catch((err) => {
        console.error('getTokens err', err);

        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          hasError: true,
        }));
        if (err.response.data) {
          setAppError(JSON.stringify(err.response.data));
        }
      });
  };

  useEffect(() => {
    if (initData) {
      updateTokens(initData);
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
