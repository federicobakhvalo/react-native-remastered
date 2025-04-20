import { Dispatch, SetStateAction } from "react";
import { AuthFormData, User } from "../types/interfaces";

export interface AuthInterface {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  AuthData: AuthFormData;
  SetAuthData: Dispatch<SetStateAction<AuthFormData>>;
}
