import Auth from "../components/Authentication/Auth";
import Home from "../components/home/Home";

import { MyRoute } from "./navigation";

export const routes: MyRoute[] = [
  {
    name: "Home",
    component: Home,
  },
  {
    name: "Auth",
    component: Auth,
  },
];
