import { createContext, useState } from "react";

export const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  let [auth, setAuth] = useState({});

  const checkLocalAuth = () => {
    let activeUser = localStorage.getItem("active-user") &&
      JSON.parse(localStorage.getItem("active-user"));
      setAuth({ user: activeUser });
  };
  const logOut = () => {
    setAuth({});
    localStorage.removeItem("active-user");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut, checkLocalAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
