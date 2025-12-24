import SectionAction from "@/components/pet/section-action";
import { RectButton } from "@/components/RectButton";
import { assets } from "@/constants/assets";
import { baseUrl } from "@/constants/constants";
import { colors, styles } from "@/constants/styles";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useAuth } from "@/lib/auth/auth";
import { PetHome, Species } from "@/lib/auth/definitions";
import PetsContainer from "@/components/pet/pets-container";

export default function PetPage() {
  const router = useRouter();
  const [pets, setPets] = useState();
  const { token } = useAuth();
  const { data, isLoading, error } = useQuery<PetHome[]>({
    queryKey: ["pets"],
    queryFn: () =>
      axios
        .get<PetHome[]>(`${baseUrl}/pets`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data),
  });

  return (
    <SafeAreaView style={styles.layout}>
      <Image
        source={require("@/assets/images/logo-home.png")}
        style={{ width: "100%", borderRadius: 15 }}
      />
      <RectButton onPress={() => {}}>
        <Text style={styles.textButton}>Add new pet</Text>
        <Image source={require("@/assets/images/plus-surface.png")} />
      </RectButton>

      <PetsContainer pets={data} isLoading={isLoading} />
      <SectionAction
        title="Manage pets"
        onPress={() => router.push("/(tabs)/my_pets")}
      />
      <SectionAction
        title="Daily meal history"
        onPress={() => router.push("/(tabs)/logs")}
      />
      <SectionAction
        title="Weight tracking"
        onPress={() => router.push("/(tabs)/logs")}
      />
    </SafeAreaView>
  );
}
