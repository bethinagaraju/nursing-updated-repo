import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface LoginContextType {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const localStorageKey = "login-context";

  const storedValue = localStorage.getItem(localStorageKey);
  const initialValue = storedValue ? JSON.parse(storedValue) : false;

  const [isLogin, setIsLogin] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(isLogin));
  }, [isLogin]);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginContextProvider");
  }
  return context;
};
