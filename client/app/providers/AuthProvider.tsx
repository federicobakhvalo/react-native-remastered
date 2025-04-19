import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { View } from "react-native";
import { AuthInterface } from "./auth.interface";
import { User } from "../types/interfaces";
import * as SplashScreen from "expo-splash-screen";

export const AuthContext = createContext({} as AuthInterface);

let ignore = SplashScreen.preventAutoHideAsync();

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<User | null>({} as User);

  useEffect(() => {
    let mounted: boolean = true;

    const checkAccessToken = async () => {
      try {
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
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
