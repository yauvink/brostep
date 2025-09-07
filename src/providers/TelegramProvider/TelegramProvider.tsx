import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { WebApp, WebAppUser } from 'telegram-web-app';
import { retrieveRawInitData } from '@telegram-apps/sdk';
import { useError } from '../ErrorProvider';
import { STORAGE_KEYS } from '../../constants/storage';
import i18n from '../../i18n';
import { Box } from '@mui/material';

interface TelegramContextType {
  webApp: WebApp | null;
  telegramUser: WebAppUser | null;
  initData: string | null;
  chatInstanceId: string | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

interface TelegramProviderProps {
  children: ReactNode;
}

const DEV_INIT_DATA_MOCK =
  'user=%7B%22id%22%3A392009623%2C%22first_name%22%3A%22Yauhen%22%2C%22last_name%22%3A%22Vink%22%2C%22username%22%3A%22yauvink%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FaW36sxyCsc7SF6iHHuDQCOXXA-gOtXB8OwbMe0HK3XQ.svg%22%7D&chat_instance=-7856053354140742542&chat_type=supergroup&auth_date=1757186029&signature=QZ6rBys9w8yYc41GX8NDBgTsxEZmjYpOOoOVT2__YJ8R12fMyozyAZvXFhR7E9KiROo4b1PbX9_rZtjwe12yAA&hash=604ecb349c6a679d6abb5d258e7006bb56fd46f84cc7e3038d7548a6debf90ea';

// const DEV_CHAT_INSTANCE_ID_MOCK = '68b5959a40ec022e1db093aa';
const DEV_CHAT_INSTANCE_ID_MOCK = '-7856053354140742542';

export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);
  const { setAppError } = useError();

  const [telegramUser, setTelegramUser] = useState<WebAppUser | null>(null);
  const [initData, setInitData] = useState<string | null>(null);
  const [chatInstanceId, setChatInstanceId] = useState<string | null>(null);

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
        setInitData(DEV_INIT_DATA_MOCK);
        setChatInstanceId(DEV_CHAT_INSTANCE_ID_MOCK);

        const userRaw = new URLSearchParams(DEV_INIT_DATA_MOCK).get('user');
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

        switch (webApp.initDataUnsafe.chat_type) {
          case 'group':
          case 'supergroup': {
            const chatInstanceId = webApp.initDataUnsafe.chat_instance;
            if (!chatInstanceId) {
              setAppError('Cant find your chat id to start your game');
            } else {
              setChatInstanceId(String(chatInstanceId));
            }
            break;
          }
          case 'private': {
            setAppError(
              `1v1 fights are not allowed yet, please use in chat.  TODO add link send to chat. chat_type: ${webApp.initDataUnsafe.chat_type}. chat_instance: ${webApp.initDataUnsafe.chat_instance}`
            );
            break;
          }
          default: {
            setAppError(
              `Are you crazy? Use in chat. TODO add link send to chat. chat_type: ${webApp.initDataUnsafe.chat_type}. chat_instance: ${webApp.initDataUnsafe.chat_instance}`
            );
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
    chatInstanceId,
  };

  return <TelegramContext.Provider value={value}>
     <Box
        sx={{
          position: 'fixed',
          zIndex: 999999,
          top: '80px',
          left: '20px',
          background: 'white',
          padding: '10px',
        }}
      >
      <div>initDataUnsafe.start_param: {webApp?.initDataUnsafe.start_param}</div>
      </Box>
      {children}</TelegramContext.Provider>;
};

export { TelegramContext };
