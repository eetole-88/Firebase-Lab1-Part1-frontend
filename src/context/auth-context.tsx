import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextModel {
  user: User | null;
}
const defaultValue: AuthContextModel = {
  user: null,
};

export const AuthContext = createContext(defaultValue);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
