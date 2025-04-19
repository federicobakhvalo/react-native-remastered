import { ComponentType } from "react";

export type RootParamList = {
  Auth: undefined;
  Home: undefined;
  Favourites: undefined;
  Search: undefined;
  Explorer: undefined;
  Profile: undefined;
};

export interface MyRoute {
  name: keyof RootParamList;
  component: ComponentType;
}
