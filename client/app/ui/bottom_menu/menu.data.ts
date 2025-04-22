import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImenuItem } from "./menu.interface";
import { EnumSecureStore } from "../../types/interfaces";

export const menuItems: ImenuItem[] = [
  { icon: "home", path: "Home" },
  { icon: "heart", path: "Favourites" },
  { icon: "user", path: "Profile", params: { isMine: true } },
  { icon: "search", path: "Search" },
  { icon: "shopping-bag", path: "Explorer" },
];
