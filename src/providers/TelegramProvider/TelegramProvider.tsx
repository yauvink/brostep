import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { WebApp, WebAppUser } from 'telegram-web-app';
import { retrieveRawInitData } from '@telegram-apps/sdk';
import { useError } from '../ErrorProvider';
import { STORAGE_KEYS } from '../../constants/storage';
import i18n from '../../i18n';

interface TelegramContextType {
  webApp: WebApp | null;
  telegramUser: WebAppUser | null;
  initData: string | null;
  paramsGameRoomId: string | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

interface TelegramProviderProps {
  children: ReactNode;
}

export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);
  const { setAppError } = useError();

  const [telegramUser, setTelegramUser] = useState<WebAppUser | null>(null);
  const [initData, setInitData] = useState<string | null>(null);
  const [paramsGameRoomId, setParamsGameRoomId] = useState<string | null>(null);

  useEffect(() => {
    const app = window.Telegram?.WebApp;
    if (app) {
      app.ready();
      app.setHeaderColor('#0E111B');
      app.setBackgroundColor('#0E111B');
      setWebApp(app);
    }
  }, [setAppError]);

  useEffect(() => {
    if (webApp) {
        if (import.meta.env.DEV) {
          console.log('>>> use mock data');
        setInitData(import.meta.env.VITE_MOCK_INIT_DATA);
        setParamsGameRoomId(import.meta.env.VITE_MOCK_CHAT_INSTANCE_ID);

        const userRaw = new URLSearchParams(import.meta.env.VITE_MOCK_INIT_DATA).get('user');
        if (userRaw) {
          const user = JSON.parse(decodeURIComponent(userRaw));
          setTelegramUser(user);
        }
      } else {
        try {
          const rawInitData = retrieveRawInitData();
          if (rawInitData) {
            setInitData(rawInitData);
          }
        } catch (err) {
          console.error('retrieveRawInitData err', err);
          setAppError('Error retrieving your data');
        }

        if (webApp.initDataUnsafe.user) {
          setTelegramUser(webApp.initDataUnsafe.user);

          const storedLanguage = window.localStorage.getItem(STORAGE_KEYS.APP_LANGUAGE);
          if (!storedLanguage && webApp.initDataUnsafe.user.language_code) {
            i18n.changeLanguage(webApp.initDataUnsafe.user.language_code);
          }
        }

        const startParam = webApp.initDataUnsafe.start_param;
        // const startParam = 'gameroom_8x123fa67s__chat_-321313123__test_stuX321o90'
        if (startParam) {
          const values = startParam.split('__');
          const chatParam = values.find((value) => value.startsWith('gameroom_'));
          if (chatParam) {
            const chatId = chatParam.replace('gameroom_', '');
            setParamsGameRoomId(chatId);
          } else {
            setAppError('Cant find your chat id to start your game, please open via link in chat');
          }
        }
      }
    }
  }, [webApp, setAppError]);

  useEffect(() => {
    webApp?.expand();
    const prevTS = Number(window.localStorage.getItem('REQUEST_WRITE_ACCESS_KEY') ?? '0');
    const now = Date.now();
    const ONE_DAY = 86400;

    if ((now - ONE_DAY >= prevTS) && !import.meta.env.DEV) {
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
    paramsGameRoomId,
  };

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>;
};

export { TelegramContext };
