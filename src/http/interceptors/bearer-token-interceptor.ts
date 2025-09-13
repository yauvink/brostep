import type {InternalAxiosRequestConfig} from 'axios';

export type TokenProvider = (...args: unknown[]) => Promise<string>;

export function createBearerTokenInterceptor(
  tokenProvider: TokenProvider,
  whitelist: string | string[],
  blackList: string | string[] = [],
): (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig> {
  whitelist = Array.isArray(whitelist) ? whitelist : [whitelist];
  blackList = Array.isArray(blackList) ? blackList : [blackList];

  return async (config: InternalAxiosRequestConfig) => {
    if (!whitelist.length) return config;

    const whitelistMatch = whitelist.some((url) => config.url && config.url.startsWith(url));
    const blackListMatch = blackList.some((url) => config.url && config.url.startsWith(url));

    if (whitelistMatch && !blackListMatch) {
      const token = await tokenProvider();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  };
}
