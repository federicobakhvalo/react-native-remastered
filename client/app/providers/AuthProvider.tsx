import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { View } from "react-native";
import { AuthInterface } from "./auth.interface";
import { AuthFormData, User } from "../types/interfaces";
import * as SplashScreen from "expo-splash-screen";
import {
  getAccessToken,
  GetUserFromAsyncStorage,
} from "../api/auth/auth.helper";

export const AuthContext = createContext({} as AuthInterface);

let ignore = SplashScreen.preventAutoHideAsync();

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [AuthData, SetAuthData] = useState<AuthFormData>({
    login: "",
    password: "",
    repeat_password: "",
    error: {
      message: null,
      field: null,
    },
  });

  useEffect(() => {
    console.log(AuthData);
  }, [AuthData]);

  useEffect(() => {
    let mounted: boolean = true;

    const checkAccessToken = async () => {
      try {
        const access_token = await getAccessToken();
        if (access_token && mounted) {
          const user = await GetUserFromAsyncStorage();
          setUser(user);
        }
      } catch (e) {
      } finally {
        await SplashScreen.hideAsync();
      }
    };
    let ignore = checkAccessToken();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser, AuthData, SetAuthData }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
