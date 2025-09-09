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
  gameRoomId: string | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

interface TelegramProviderProps {
  children: ReactNode;
}

const DEV_INIT_DATA_MOCK =
"user=%7B%22id%22%3A392009623%2C%22first_name%22%3A%22Yauhen%22%2C%22last_name%22%3A%22Vink%22%2C%22username%22%3A%22yauvink%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FaW36sxyCsc7SF6iHHuDQCOXXA-gOtXB8OwbMe0HK3XQ.svg%22%7D&chat_instance=-2232010744128441235&chat_type=supergroup&start_param=gameroom_68c08b48df62c62d1a7e81d3&auth_date=1757452436&signature=VHSWRv_KInWCAjYtwgjbFqN_LOvHKba_E4RDAg7nDdZLgwD9scBBY9vIi2_mlbxi4dBlC75x6OwDq_qxi-r0AA&hash=2e0e2d52e6776da58f52a921190f345e964e184ffd10f47766dc65aee2ba6e54"

const DEV_CHAT_INSTANCE_ID_MOCK = '68c08b48df62c62d1a7e81d3';

export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);
  const { setAppError } = useError();

  const [telegramUser, setTelegramUser] = useState<WebAppUser | null>(null);
  const [initData, setInitData] = useState<string | null>(null);
  const [gameRoomId, setGameRoomId] = useState<string | null>(null);

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
        setGameRoomId(DEV_CHAT_INSTANCE_ID_MOCK);

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

        const startParam = webApp.initDataUnsafe.start_param;
        // const startParam = 'chat_-321313123__test_stuX321o90'
        if (startParam) {
          const values = startParam.split('__');
          const chatParam = values.find((value) => value.startsWith('gameroom_'));
          if (chatParam) {
            const chatId = chatParam.replace('gameroom_', '');
            setGameRoomId(chatId);
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
    gameRoomId,
  };

  return (
    <TelegramContext.Provider value={value}>
      {/* <Box
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
        <div>gameRoomId: {gameRoomId}</div>
      </Box> */}
      {children}
    </TelegramContext.Provider>
  );
};

export { TelegramContext };
