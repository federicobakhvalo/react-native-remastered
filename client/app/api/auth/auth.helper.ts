import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { EnumSecureStore, Itokens } from "../../types/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  await setItemAsync(EnumSecureStore.ACCESS_TOKEN, data.access_token);
  await setItemAsync(EnumSecureStore.REFRESH_TOKEN, data.refresh_token);
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
