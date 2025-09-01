import { useEffect, useState } from 'react';
import { authenticate, renewRefreshToken } from '../services/requests.tsx';
import { useError } from '../providers/ErrorProvider/useError.ts';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  hasError: boolean;
}

export const useAuth = (initData: string | null) => {
  const { setAppError } = useError();
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    hasError: false,
  });

  const updateTokens = async (initData: string) => {
    console.log('1', 1, initData);
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    getTokens(initData)
      .then((res) => {
        console.log('res', res);

        localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refreshToken);
        localStorage.setItem(ACCESS_TOKEN_KEY, res.data.accessToken);
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
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  try {
    if (refreshToken) return await renewRefreshToken(refreshToken);
    return authenticate(initData);
  } catch {
    return authenticate(initData);
  }
}
