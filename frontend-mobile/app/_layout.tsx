import { Slot, Stack, useRouter } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/lib/auth/auth";
import { useEffect } from "react";
import AuthGate from "./AuthGate";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthGate>
          <Slot />
        </AuthGate>
      </AuthProvider>
    </QueryClientProvider>
  );
}
