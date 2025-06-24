import { createContext } from "react"
import { Login, LoginResponse, Register } from "../models/auth.model"

export interface AuthContextType {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  errors: string[];
  loading: boolean;
  signin: (user: Login) => Promise<void>;
  signup: (user: Register) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null) 
