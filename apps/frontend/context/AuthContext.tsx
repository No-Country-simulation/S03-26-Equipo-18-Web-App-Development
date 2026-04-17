"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  organization: string | null;
  adminId: string | null;
  apiKey?: string | null;
};

type AuthMeResponse = {
  success: boolean;
  data: User;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user?: User | null) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await api.get<AuthMeResponse>("/auth/me");
      const freshUser = response.data.data;

      setUser(freshUser);
      localStorage.setItem("user", JSON.stringify(freshUser));
    } catch (error) {
      console.error("Error obteniendo perfil con /auth/me:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const initSession = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
          setLoading(false);
          return;
        }

        setToken(storedToken);
        await fetchProfile();
      } catch (error) {
        console.error("Error cargando sesión:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, []);

  const login = async (newToken: string, fallbackUser?: User | null) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    try {
      const response = await api.get<AuthMeResponse>("/auth/me");
      const freshUser = response.data.data;

      setUser(freshUser);
      localStorage.setItem("user", JSON.stringify(freshUser));
    } catch (error) {
      console.error("Error obteniendo perfil tras login:", error);

      if (fallbackUser) {
        setUser(fallbackUser);
        localStorage.setItem("user", JSON.stringify(fallbackUser));
      } else {
        setUser(null);
      }
    }
  };

  const refreshProfile = async () => {
    if (!token) return;
    await fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};