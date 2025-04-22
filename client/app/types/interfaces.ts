import { PressableProps, ViewStyle } from "react-native";

export interface User {
  id: string;
  username: string;
  avatar_url: string | null;
  password?: string;
  email?: string;
  favourites?: any;
}

export interface AuthForm {
  login: string;
  password: string;
  repeat_password?: string;
}

export type TError = {
  field: keyof AuthForm | null;
  message: string | null;
};

export interface AuthFormData {
  login: string;
  password: string;
  repeat_password?: string;
  error: TError;
  isLoading: boolean;
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
  value: string | undefined;
  onChange: (text: string) => void;
  label?: keyof AuthForm; // текст метки
  error?: TError;
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

export interface Itokens {
  access: string;
  refresh: string;
}
