import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Login, LoginResponse, Register, RegisterResponse } from "../models/auth.model"
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth"
import Cookies from "js-cookie";

interface AuthContextType {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  errors: string[];
  loading: boolean;
  signin: (user: Login) => Promise<void>;
  signup: (user: Register) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within a AuthProvider")
  return context 
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  const signup = async(user: Register) => {
    try{
      const {status, data} = await registerRequest(user)
      if (status >= 200 && status < 300 && data && !("message" in data)) {
        setUser(data as RegisterResponse);
        setIsAuthenticated(true);
      } else if (data && "message" in data) {
        setErrors([data.message]);
      } else {
        setErrors(["Ocurrió un error desconocido al iniciar sesión."]);
      }
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Error inesperado";
      setErrors([message]);
    } finally {
      setLoading(false);
    }
  }

  const signin =  async(user: Login) => {
    try {
      const { status, data } = await loginRequest(user);

      if (status >= 200 && status < 300 && data && !("message" in data)) {
        setUser(data as LoginResponse);
        setIsAuthenticated(true);
      } else if (data && "message" in data) {
        setErrors([data.message]);
      } else {
        setErrors(["Ocurrió un error desconocido al iniciar sesión."]);
      }
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Error inesperado";
      setErrors([message]);
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    Cookies.remove("token")
    setUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      try {
        const res = await verifyTokenRequest()
        console.log({res})
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true)
        setUser(res.data)
      } catch (error: unknown) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        user,
        signup,
        signin, 
        logout,
        isAuthenticated,
        errors,
        loading, 
      }} 
    >
      {children}
    </AuthContext.Provider>
  )
}
