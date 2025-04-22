import { RouteProp, useRoute } from "@react-navigation/native";
import { RootParamList } from "./navigation";

export const useTypedRoute = <N extends keyof RootParamList>() =>
  useRoute<RouteProp<RootParamList, N>>();
