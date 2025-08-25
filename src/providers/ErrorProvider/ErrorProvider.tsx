import React, { createContext, useState, type ReactNode } from 'react';

interface ErrorContextType {
  appError: string | null;
  setAppError: (error: string | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [appError, setAppError] = useState<string | null>(null);

  const value: ErrorContextType = {
    appError,
    setAppError,
  };

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
};

export { ErrorContext };
