"use client";

import { UserDetails } from "@/interfaces/login-user-details";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
interface AuthContextType {
  user: UserDetails | null;
  setUser: (value: UserDetails | null) => void;
  token: string;
  setToken: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [token, setToken] = useState<string>("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const tempUser = localStorage.getItem("task-user");
    const tempToken = localStorage.getItem("task-token");
    if (tempUser) {
      setUser(JSON.parse(tempUser));
    }
    if (tempToken) {
      setToken(JSON.parse(tempToken));
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, search, setSearch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const AuthStatesContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth Context must be used within a Auth Context Provider");
  }
  return context;
};
