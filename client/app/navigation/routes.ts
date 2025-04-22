import Auth from "../components/Authentication/Auth";
import Home from "../components/home/Home";
import Profile from "../components/profile/Profile";

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
  { name: "Profile", component: Profile },
];
