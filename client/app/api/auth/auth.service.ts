import axios from "axios";
import { SERVER_URL } from "../../config/api.config";
import { deleteTokensToStorage } from "./auth.helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthForm, EnumSecureStore, TError } from "../../types/interfaces";

export const AuthService = {
  async main(isReg: boolean, login: string, password: string) {
    const response = await axios.post(
      `${SERVER_URL}/api/auth/${isReg ? "register/" : "token/"}`,
      { login, password }
    );
  },

  async logout() {
    await deleteTokensToStorage();
    await AsyncStorage.removeItem(EnumSecureStore.USER);
  },
};

export const validateAuthForm = (
  data: AuthForm,
  isReg: boolean
): true | TError => {
  const login = data.login.trim();
  const password = data.password.trim();
  const repeatPassword = data.repeat_password?.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (isReg) {
    if (!emailRegex.test(login)) {
      return { field: "login", message: "Invalid email format" };
    }

    if (!passwordRegex.test(password)) {
      return {
        field: "password",
        message:
          "Password must be at least 6 characters and contain letters and numbers",
      };
    }

    if (password !== repeatPassword) {
      return {
        field: "repeat_password",
        message: "Passwords do not match",
      };
    }
  } else {
    if (!login || !password) {
      return {
        field: "login",
        message: "Enter login and password",
      };
    }
  }

  return true;
};
