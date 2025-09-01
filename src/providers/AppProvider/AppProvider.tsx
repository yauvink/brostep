import React, { createContext, useState, type ReactNode } from 'react';
import { useTelegram } from '../TelegramProvider/useTelegram';
// import { ToastContainer, toast } from 'react-toastify';
import { APP_VIEW } from '../../constants/app.constants';
import { useAuth, type AuthState } from '../../hooks/useAuth.tsx';

interface AppContextType {
  authState: AuthState;
  appView: string;
  setAppView: (view: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appView, setAppView] = useState(APP_VIEW.MAIN);
  const { initData } = useTelegram();
  const { authState } = useAuth(initData);

  console.log('===================== authState.accessToken =====================');
  console.log(authState.accessToken);

  const value: AppContextType = {
    authState,
    appView,
    setAppView,
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
