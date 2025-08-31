import { useEffect, useState } from 'react';
import { authenticate, renewRefreshToken } from '../services/requests.tsx';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    hasError: boolean;
}

export const useAuth = (initData: string | null) => {
    const [authState, setAuthState] = useState<AuthState>({
        accessToken: null,
        refreshToken: null,
        isLoading: false,
        hasError: false,
    });

    const updateTokens = async (initData: string) => {
        setAuthState(prev => ({ ...prev, isLoading: true }));

        try {
            const { data } = await getTokens(initData);

            localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);

            setAuthState({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                isLoading: false,
                hasError: false,
            });
        } catch {
            setAuthState(prev => ({
                ...prev,
                isLoading: false,
                hasError: true,
            }));
        }
    }

    useEffect(() => {
        if (initData) {
            updateTokens(initData);
        }
    }, [initData]);

    return { authState }
}

async function getTokens(initData: string) {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    try {
        if (refreshToken) return await renewRefreshToken(refreshToken);
        return authenticate(initData);
    } catch {
        return authenticate(initData);
    }
}
