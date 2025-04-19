import { Dispatch, SetStateAction } from "react";
import { User } from "../types/interfaces";

export interface AuthInterface {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}
