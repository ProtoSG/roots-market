import { ReactNode, useEffect, useState } from "react"
import { Login, LoginSuccess, Register } from "../models/auth.model"
import { loginRequest, logoutRequest, registerRequest, verifyTokenRequest } from "../api/auth"
import { AuthContext } from "./aut.context"

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<LoginSuccess | null>(null)
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
        setUser(data as LoginSuccess);
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
        setUser(data as LoginSuccess);
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
    await logoutRequest()
    setUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest()
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true)
        setUser(res.data as LoginSuccess)
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
