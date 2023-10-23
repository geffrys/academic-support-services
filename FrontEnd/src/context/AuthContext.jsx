import { createContext, useState, useContext, useEffect } from "react";
import {
  getUserRequest,
  createUserRequest,
  loginUserRequest,
  verifyTokenRequest,
  logOutRequest,
} from "../api/users.api";
import Cookies from "js-cookie";
import { get } from "react-hook-form";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthPrivider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async (user) => {
    try {
      const res = await getUserRequest(user);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (user) => {
    try {
      const res = await createUserRequest(user);
      setIsAuthenticated(true);
      return res;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const logIn = async (user) => {
    try {
      const res = await loginUserRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const logOut = async () => {
    try {
      const res = await logOutRequest();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          return setIsAuthenticated(false);
        }
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, getUser, logIn, signUp, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
