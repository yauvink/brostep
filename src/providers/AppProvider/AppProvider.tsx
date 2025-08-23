import React, { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { useTelegram } from '../TelegramProvider/useTelegram';
import { getUser, type GetUserResponse } from '../../services/requests';
import { ToastContainer, toast } from 'react-toastify';
import { APP_VIEW } from '../../constants/app.constants';
interface AppContextType {
  isAppLoading: boolean;
  setIsAppLoading: (loading: boolean) => void;
  userData: GetUserResponse | null;
  appView: string;
  setAppView: (view: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appView, setAppView] = useState(APP_VIEW.MAIN);
  const { telegramUser } = useTelegram();
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [userData, setUserData] = useState<GetUserResponse | null>(null);

  const updateUser = useCallback(async () => {
    if (!telegramUser) return;

    const ref_code = 'ref_code_0x1';

    getUser({
      telegram_id: telegramUser.id,
      username: telegramUser.username ?? '',
      last_name: telegramUser.last_name ?? '',
      first_name: telegramUser.first_name,
      is_premium: Boolean(telegramUser.is_premium),
      photo_url: telegramUser.photo_url,
      ref_code,
    })
      .then((res) => {
        setUserData(res.data);
        setIsAppLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
        const errMessage = err.message;
        const respErrorMessage = err?.response?.data?.error ?? '';
        toast(`Error fetching user. ${errMessage}. ${respErrorMessage}`, {
          type: 'error',
        });
      });
  }, [telegramUser]);

  useEffect(() => {
    if (telegramUser) {
      updateUser();
    }
  }, [telegramUser, updateUser]);

  const value: AppContextType = {
    isAppLoading,
    setIsAppLoading,
    userData,
    appView,
    setAppView,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      // closeOnClick={false}
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      // transition={Bounce}
      />
    </AppContext.Provider>
  );
};

export { AppContext };
