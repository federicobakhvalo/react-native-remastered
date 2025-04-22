import React from "react";
import { RootParamList } from "../../navigation/navigation";

import { Feather } from "@expo/vector-icons";

export type FeatherIcon = keyof typeof Feather.glyphMap;

export type TypeNavigate = <T extends keyof RootParamList>(
  screenName: T,
  params: RootParamList[T] extends undefined ? undefined : RootParamList[T]
) => void;

export interface ImenuItem {
  icon: FeatherIcon;
  path: keyof RootParamList;
  params?: RootParamList[keyof RootParamList];
}
