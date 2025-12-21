import React, { createContext, useContext, useState, useEffect } from "react";
import { getTokenAsyncStorage } from "./getOrFetchToken";
import { baseUrl } from "@/constants/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "@/constants/auth";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuhenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getTokenAsyncStorage();
      setIsAuhenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const token: string = await axios.post(`${baseUrl}/auth/signin`, {
        email,
        password,
      });

      if (token) {
        setIsAuhenticated(true);
        await AsyncStorage.setItem(TOKEN_KEY, token);
      }
    } catch (e) {
      console.error("Error al autenticar", e);
    }
  };

  const logout = () => setIsAuhenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth mus be used within AuthProvider");

  return context;
}
