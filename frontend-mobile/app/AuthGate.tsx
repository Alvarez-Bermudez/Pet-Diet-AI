import { useAuth } from "@/lib/auth/auth";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/(auth)/getStarted");
    }
  }, [isAuthenticated, loading]);

  return <>{children}</>;
}
