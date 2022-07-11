import { createContext } from "react";

interface AuthContextInterface {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export default createContext<AuthContextInterface | null>(null);
