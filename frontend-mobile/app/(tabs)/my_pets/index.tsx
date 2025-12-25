import Header from "@/components/header";
import MyPetsContainer from "@/components/my-pets/mypets-container";
import { baseUrl } from "@/constants/constants";
import { colors, styles } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import { PetHome } from "@/lib/auth/definitions";
import { getStatusBarHeight } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPetsPage() {
  const { token } = useAuth();
  const [isExtendedAddNewPet, setIsExtendedAddNewPet] = useState(true);
  const [visibleAddNewPet, setVisibleAddNewPet] = useState(true);
  const router = useRouter();

  const { data, isLoading, error } = useQuery<PetHome[]>({
    queryKey: ["my_pets"],
    queryFn: () =>
      axios
        .get<PetHome[]>(`${baseUrl}/pets`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data),
  });

  // const fabStyle = { [animateFrom]: 16 };
  function handleAddNewPet() {
    if (isExtendedAddNewPet === false) setIsExtendedAddNewPet(true);
    else {
      setTimeout(() => {
        router.push("/(tabs)/my_pets/add-new-pet");
        setIsExtendedAddNewPet(false);
      }, 500);
    }
  }

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header title="My Pets" subtitle="Manage your pets" />

      <MyPetsContainer pets={data} />

      <AnimatedFAB
        icon={"plus"}
        label={"Add new pet"}
        extended={isExtendedAddNewPet}
        onPress={handleAddNewPet}
        visible={visibleAddNewPet}
        animateFrom={"right"}
        iconMode={"static"}
        color={colors.primary}
        style={[
          localStyles.fabStyle,
          { backgroundColor: colors.surface, width: "auto" },
        ]}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
