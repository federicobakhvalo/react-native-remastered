import React from "react";
import { RootParamList } from "../../navigation/navigation";

import { Feather } from "@expo/vector-icons";

export type FeatherIcon = keyof typeof Feather.glyphMap;

export type TypeNavigate = (screenName: keyof RootParamList) => void;

export interface ImenuItem {
  icon: FeatherIcon;
  path: keyof RootParamList;
}
