"use client"

import { createContext, ReactNode, useEffect, useState } from "react"
import { AuthResponse, AuthUser, LoginCredentials, RegisterCredentials } from "../types/auth"
import { login as loginApi, register as registerApi } from "../utils/api"
import { toast } from "react-toastify"

interface AuthContextType {
    user: AuthUser | null
    token: string | null
    login: (credentials: LoginCredentials) => Promise<void>
    register: (credentials: RegisterCredentials) => Promise<void>
    logout: () => void
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
    setIsLoading(true)
      const response: AuthResponse = await loginApi(credentials);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success("Login successful!")
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
        setIsLoading(false)
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true)
      const response: AuthResponse = await registerApi(credentials);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info("Logged out successfully.");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
