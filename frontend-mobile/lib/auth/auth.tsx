import React, { createContext, useContext, useState, useEffect } from "react";
import { getTokenAsyncStorage } from "./getOrFetchToken";
import { baseUrl } from "@/constants/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "@/constants/auth";
import { Alert } from "react-native";

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  token: string | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuhenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getTokenAsyncStorage();
      if (token) setToken(token);
      setIsAuhenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/signin`, {
        email,
        password,
      });

      setIsAuhenticated(true);
      const token = response.data.access_token;
      console.log(`Dentro de login function, token: ${token}`);
      setToken(token);
      await AsyncStorage.setItem(TOKEN_KEY, token);
      setLoading(false);
    } catch (e) {
      Alert.alert("Failed to sign in", "Credentials invalid");
      return;
    }
  };

  const logout = () => setIsAuhenticated(false);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth mus be used within AuthProvider");

  return context;
}
