import { PressableProps, ViewStyle } from "react-native";

export interface User {
  id: string;
  name: string;
  avatar_url: string | null;
  password: string;
  email?: string;
  favourites: any;
}

export interface AuthForm {
  name: string;
  password: string;
}

export interface Button extends PressableProps {
  classname?: string;
  style?: ViewStyle;
}

export interface ButtonStyleItem {
  fontSize?: number;
  background?: string;
  color?: string;
  margin?: string;
}

export interface ButtonStyle {
  authorization: ButtonStyleItem;
}

export interface InputAuthProps {
  value: string;
  onChange: (text: string) => void;
  label?: string; // текст метки
  error?: string; // ошибка (если есть)
  secureTextEntry?: boolean;
  placeholder?: string;
  style?: ViewStyle;
  classname?: string;
  icon?: React.ReactNode;
}

export enum EnumSecureStore {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  USER = "user",
}

export enum EnumAsyncStorage {}

export interface Itokens {
  access_token: string;
  refresh_token: string;
}
