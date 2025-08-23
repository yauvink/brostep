import React, { createContext, useState, useEffect, type ReactNode, useMemo } from 'react';
import type { WebApp, WebAppUser } from 'telegram-web-app';

interface TelegramContextType {
  webApp: WebApp | null;
  telegramUser: WebAppUser | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

interface TelegramProviderProps {
  children: ReactNode;
}

const userMock: WebAppUser = {
  allows_write_to_pm: true,
  first_name: 'Yauhen',
  id: 392009623,
  language_code: 'en',
  last_name: 'Vink',
  photo_url: 'https://t.me/i/userpic/320/aW36sxyCsc7SF6iHHuDQCOXXA-gOtXB8OwbMe0HK3XQ.svg',
  username: 'yauvink',
};

export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  const telegramUser = useMemo(() => {
    if (import.meta.env.DEV) {
      return userMock;
    }
    return webApp?.initDataUnsafe?.user ?? null;
  }, [webApp]);

  useEffect(() => {
    const app = window.Telegram?.WebApp;
    if (app) {
      app.ready();
      app.setHeaderColor('#0E111B');
      app.setBackgroundColor('#0E111B');
      setWebApp(app);
    }
  }, []);

  useEffect(() => {
    webApp?.expand();
    const prevTS = Number(window.localStorage.getItem('REQUEST_WRITE_ACCESS_KEY') ?? '0');
    const now = Date.now();
    const ONE_DAY = 86400;

    if (now - ONE_DAY >= prevTS) {
      try {
        webApp?.requestWriteAccess((success) => {
          console.log('requestWriteAccess success', success);
          window.localStorage.setItem('REQUEST_WRITE_ACCESS_KEY', String(now));
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [webApp]);

  const value: TelegramContextType = {
    webApp,
    telegramUser,
  };

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>;
};

export { TelegramContext };
