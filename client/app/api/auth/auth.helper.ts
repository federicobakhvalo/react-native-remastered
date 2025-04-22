import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { EnumSecureStore, Itokens, User } from "../../types/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthInterface } from "../../providers/auth.interface";
import axios, { AxiosHeaders } from "axios";
import { SERVER_URL } from "../../config/api.config";

export const getAccessToken = async () => {
  const accessToken = await getItemAsync(EnumSecureStore.ACCESS_TOKEN);
  return accessToken || null;
};

export const GetUserFromAsyncStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(EnumSecureStore.USER);
    return JSON.parse(data || "{}");
  } catch (error) {
    return null;
  }
};

export const saveTokensToStorage = async (data: Itokens) => {
  await setItemAsync(EnumSecureStore.ACCESS_TOKEN, data.access);
  await setItemAsync(EnumSecureStore.REFRESH_TOKEN, data.refresh);
};

export const deleteTokensToStorage = async () => {
  const accessToken = await getItemAsync(EnumSecureStore.ACCESS_TOKEN);
  const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN);

  if (accessToken) {
    await deleteItemAsync(EnumSecureStore.ACCESS_TOKEN);
  }

  if (refreshToken) {
    await deleteItemAsync(EnumSecureStore.ACCESS_TOKEN);
  }
};

export const getNewTokens = async () => {
  try {
    const refresh_token = await getItemAsync(EnumSecureStore.REFRESH_TOKEN);

    if (!refresh_token) return null;

    const response = await axios.post<Itokens>(
      `${SERVER_URL}/api/auth/token/refresh/`,
      { refresh: refresh_token }
    );

    if (response.status === 200 && response.data) {
      await saveTokensToStorage(response.data);
    }
    return;

    // Сохраняем новые токены
  } catch (error) {
    console.error("Ошибка при обновлении токенов", error);
    return null;
  }
};

export const saveToStorage = async (tokens: Itokens, user_data: User) => {
  await saveTokensToStorage(tokens);
  try {
    await AsyncStorage.setItem(EnumSecureStore.USER, JSON.stringify(user_data));
  } catch (e) {}
};
