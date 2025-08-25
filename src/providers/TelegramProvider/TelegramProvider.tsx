import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { WebApp, WebAppUser } from 'telegram-web-app';
import { useError } from '../ErrorProvider';

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
const userMock1: WebAppUser = {
  allows_write_to_pm: true,
  first_name: 'Tester1',
  id: 3231231,
  language_code: 'en',
  last_name: '',
  photo_url: 'https://gravatar.com/avatar/ed9aeeed8a2c68aa053a8c8a3c870c5d?s=400&d=robohash&r=x',
  username: 'yauvink',
};
const userMock2: WebAppUser = {
  allows_write_to_pm: true,
  first_name: 'Test2',
  id: 5555555,
  language_code: 'en',
  last_name: '',
  photo_url: 'https://robohash.org/6db66d69373a72d263537c7675f20da3?set=set4&bgset=&size=400x400',
  username: 'yauvink',
};

export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);
  const { setAppError } = useError();

  const [telegramUser, setTelegramUser] = useState<WebAppUser | null>(null);

  useEffect(() => {
    const app = window.Telegram?.WebApp;
    console.log('app', app);
    if (app) {
      app.ready();
      app.setHeaderColor('#0E111B');
      app.setBackgroundColor('#0E111B');
      setWebApp(app);
      if (app.initDataUnsafe.user) {
        setTelegramUser(app.initDataUnsafe.user);
      } else {
        if (import.meta.env.DEV) {
          const id = new URLSearchParams(window.location.search).get('id');
          if (Number(id) === 1) {
            setTelegramUser(userMock1);
          } else if (Number(id) === 2) {
            setTelegramUser(userMock2);
          } else {
            setTelegramUser(userMock);
          }
        } else {
          setAppError('Please open in Telegram @bro_step_bot');
        }
      }
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
