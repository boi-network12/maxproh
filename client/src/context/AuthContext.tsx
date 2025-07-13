"use client"

import { createContext, ReactNode, useEffect, useState } from "react"
import { AuthResponse, AuthUser, LoginCredentials, RegisterCredentials } from "../types/auth"
import { getMe, login as loginApi, register as registerApi } from "../utils/api"
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

      fetchUserProfile(storedToken)
    }
    setIsLoading(false);
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const profile = await getMe(token);
      setUser({
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        accountBalance: profile.accountBalance,
        role: profile.role,
        isActive: profile.isActive,
        socialMediaProfiles: profile.socialMediaProfiles,
      });
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
    setIsLoading(true)
      const response: AuthResponse = await loginApi(credentials);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      await fetchUserProfile(response.token)
      toast.success("Login successful!")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login Failed. please check your credentials"
      toast.error(message);
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
      await fetchUserProfile(response.token)
      toast.success("Registration successful!");
    } catch (error) {
      const message =
      error instanceof Error ? error.message : "Registration failed. Please try again.";
      toast.error(message);
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
