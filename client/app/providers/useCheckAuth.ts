import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { AuthService } from "../api/auth/auth.service";
import { getAccessToken, getNewTokens } from "../api/auth/auth.helper";
import { getItemAsync } from "expo-secure-store";
import { EnumSecureStore } from "../types/interfaces";

export const useCheckAuth = (routeName?: string) => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const checkAccessToken = async () => {
      const access_token = await getAccessToken();
      if (access_token) {
        try {
          await getNewTokens();
        } catch (e) {
          await AuthService.logout();
          setUser(null);
        }
      }
    };

    let ignore = checkAccessToken();
  }, []);

  useEffect(() => {
    const checkAccessToken = async () => {
      const refresh_token = await getItemAsync(EnumSecureStore.REFRESH_TOKEN);
      if (!refresh_token && user) {
        await AuthService.logout();
        setUser(null);
      }
    };

    let ignore = checkAccessToken();
  }, [routeName]);
};
