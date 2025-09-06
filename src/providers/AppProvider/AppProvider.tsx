import React, { createContext, useState, type ReactNode } from 'react';
import { useTelegram } from '../TelegramProvider/useTelegram';
// import { ToastContainer, toast } from 'react-toastify';
import { APP_VIEW, AppLanguages } from '../../constants/app.constants';
import { useAuth, type AuthState } from '../../hooks/useAuth.tsx';
import { useTranslation } from 'react-i18next';
import { STORAGE_KEYS } from '../../constants/storage.tsx';

interface AppContextType {
  authState: AuthState;
  appView: string;
  setAppView: (view: string) => void;
  handleChangeAppLanguage: (language: AppLanguages) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appView, setAppView] = useState(APP_VIEW.MAIN);
  const { initData } = useTelegram();
  const { authState } = useAuth(initData);
  const { i18n } = useTranslation();

  // console.log('===================== authState.accessToken =====================');
  // console.log(authState.accessToken);

  const handleChangeAppLanguage = (language: AppLanguages) => {
    i18n.changeLanguage(language);
    window.localStorage.setItem(STORAGE_KEYS.APP_LANGUAGE, language);
  };

  const value: AppContextType = {
    authState,
    appView,
    setAppView,
    handleChangeAppLanguage,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {/* <ToastContainer
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
      /> */}
    </AppContext.Provider>
  );
};

export { AppContext };
