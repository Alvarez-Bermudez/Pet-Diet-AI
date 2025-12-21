import { Slot, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/lib/auth/auth";
import AuthGate from "./AuthGate";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import { Nunito_400Regular, Nunito_500Medium } from "@expo-google-fonts/nunito";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Nunito_400Regular,
    Nunito_500Medium,
    Inter_400Regular,
    Inter_500Medium,
  });

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
