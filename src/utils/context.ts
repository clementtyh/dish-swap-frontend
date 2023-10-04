import { createContext } from "react";
import IAuthContext from "../types/AuthContextInterface.js";

export const authContext = createContext<IAuthContext>({
  token: "",
  setToken: (_: string) => {},
  decoded: {},
  setDecoded: (_: string) => {},
});
