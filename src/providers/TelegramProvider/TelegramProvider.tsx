import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { WebApp, WebAppUser } from 'telegram-web-app';
import { retrieveRawInitData } from '@telegram-apps/sdk';
import { useError } from '../ErrorProvider';

interface TelegramContextType {
  webApp: WebApp | null;
  telegramUser: WebAppUser | null;
  initData: string | null;
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
  first_name: 'Bender',
  id: 14888888,
  language_code: 'en',
  last_name: '',
  photo_url: 'https://gravatar.com/avatar/ed9aeeed8a2c68aa053a8c8a3c870c5d?s=400&d=robohash&r=x',
  username: 'ben',
};
const userMock2: WebAppUser = {
  allows_write_to_pm: true,
  first_name: 'Kisa',
  id: 5555555,
  language_code: 'en',
  last_name: 'Drisa',
  photo_url: 'https://robohash.org/6db66d69373a72d263537c7675f20da3?set=set4&bgset=&size=400x400',
  username: 'kisa',
};

export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);
  const { setAppError } = useError();

  const [telegramUser, setTelegramUser] = useState<WebAppUser | null>(null);
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    const app = window.Telegram?.WebApp;
    if (import.meta.env.DEV) {
      const testData =
        'user=%7B%22id%22%3A392009623%2C%22first_name%22%3A%22Yauhen%22%2C%22last_name%22%3A%22Vink%22%2C%22username%22%3A%22yauvink%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FaW36sxyCsc7SF6iHHuDQCOXXA-gOtXB8OwbMe0HK3XQ.svg%22%7D&chat_instance=-5805934516278627323&chat_type=private&auth_date=1756755397&signature=Qqk68Fql-BRG8nZVgLtigxDqGFKPKao3YRNn8nam_uUooEAsjjogWW7moxwTufa_6Vma3hS4i0v3RZjdia8WBw&hash=3c3238ce1e5f99baf22d644e60c3b5f4bf0c2b2ec772b2ee50d650766a8695d0';
      setInitData(testData);
    } else {
      try {
        const rawInitData = retrieveRawInitData();
        if (rawInitData) {
          setInitData(rawInitData);
        }
      } catch (err) {
        console.error('retrieveRawInitData err', err);
      }
    }

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
    initData,
  };

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>;
};

export { TelegramContext };
