import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
