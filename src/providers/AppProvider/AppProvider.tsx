import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import { useTelegram } from '../TelegramProvider/useTelegram';
// import { ToastContainer, toast } from 'react-toastify';
import { APP_VIEW, AppLanguages, GAME_NAME } from '../../constants/app.constants';
import { DEFAULT_AUTH_STATE, useAuth, type AuthState } from '../../hooks/useAuth.tsx';
import { useTranslation } from 'react-i18next';
import { STORAGE_KEYS } from '../../constants/storage.tsx';
import AcceptTerms from '../../components/AcceptTerms.tsx';

interface AppContextType {
  authState: AuthState;
  appView: string;
  setAppView: (view: string) => void;
  handleChangeAppLanguage: (language: AppLanguages) => void;
  handleAcceptTerms: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appView, setAppView] = useState(APP_VIEW.MAIN);
  const [isTermsAccepted, setIsTermsAccepted] = useState(
    window.localStorage.getItem(STORAGE_KEYS.TERMS_ACCEPTED) === 'true'
  );
  const { initData } = useTelegram();
  const { authState } = useAuth(initData);
  const { i18n } = useTranslation();

  // console.log('===================== authState.accessToken =====================');
  // console.log(authState.accessToken);

  useEffect(() => {
    document.title = i18n.t('gameTitle', { gameName: GAME_NAME });
  }, [i18n]);

  const handleChangeAppLanguage = (language: AppLanguages) => {
    i18n.changeLanguage(language);
    window.localStorage.setItem(STORAGE_KEYS.APP_LANGUAGE, language);
  };

  const handleAcceptTerms = () => {
    window.localStorage.setItem(STORAGE_KEYS.TERMS_ACCEPTED, 'true');
    setIsTermsAccepted(true);
  };

  const value: AppContextType = {
    authState: isTermsAccepted ? authState : DEFAULT_AUTH_STATE,
    appView,
    setAppView,
    handleChangeAppLanguage,
    handleAcceptTerms,
  };

  return (
    <AppContext.Provider value={value}>
      {isTermsAccepted ? (
        children
      ) : (
        <AcceptTerms
          handleAcceptTerms={handleAcceptTerms}
          handleChangeAppLanguage={handleChangeAppLanguage}
          i18n={i18n}
        />
      )}
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
