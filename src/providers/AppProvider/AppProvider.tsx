import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import { useTelegram } from '../TelegramProvider/useTelegram';
// import { ToastContainer, toast } from 'react-toastify';
import { APP_VIEW, LanguageCode } from '../../constants/app.constants';
import { DEFAULT_AUTH_STATE, useAuth, type AuthState } from '../../hooks/useAuth.tsx';
import { useTranslation } from 'react-i18next';
import { STORAGE_KEYS } from '../../constants/storage.tsx';
import AcceptTerms from '../../components/AcceptTerms.tsx';
import { getUserLanguage, updateUserLanguage } from '../../services/requests.tsx';
import { useAppColor } from '../../hooks/useAppColor';

interface AppContextType {
  authState: AuthState;
  appView: string;
  setAppView: (view: string) => void;
  handleChangeAppLanguage: (language: LanguageCode) => void;
  handleAcceptTerms: () => void;
  handleChangeAppColor: () => void;
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
  const { t, i18n } = useTranslation();
  const { handleChangeAppColor } = useAppColor();

  // console.log('===================== authState.accessToken =====================');
  // console.log(authState.accessToken);

  useEffect(() => {
    if (authState.authenticated) {
      getUserLanguage()
        .then((res) => {
          i18n.changeLanguage(res.data.languageCode);
          window.localStorage.setItem(STORAGE_KEYS.APP_LANGUAGE, res.data.languageCode);
        })
        .catch((err) => {
          console.error('get language error', err);
        });
    }
  }, [authState.authenticated, i18n]);

  useEffect(() => {
    document.title = i18n.t('gameTitle', { gameName: t('gameName') });
  }, [i18n, t]);

  const handleChangeAppLanguage = (newLanguage: LanguageCode) => {
    updateUserLanguage(newLanguage)
      .then((res) => {
        i18n.changeLanguage(res.data.languageCode);
        window.localStorage.setItem(STORAGE_KEYS.APP_LANGUAGE, res.data.languageCode);
      })
      .catch((err) => {
        console.error('update language error', err);
      });
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
    handleChangeAppColor,
  };

  return (
    <AppContext.Provider value={value}>
      {isTermsAccepted ? children : <AcceptTerms handleAcceptTerms={handleAcceptTerms} />}
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
