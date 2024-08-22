import { createContext, useState } from "react";

export const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  let [auth, setAuth] = useState({});

  const logOut = () => {
    setAuth({});
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
