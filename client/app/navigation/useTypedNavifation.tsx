import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootParamList } from "./navigation";

export const useTypedNavigation = () =>
  useNavigation<NavigationProp<RootParamList>>();
