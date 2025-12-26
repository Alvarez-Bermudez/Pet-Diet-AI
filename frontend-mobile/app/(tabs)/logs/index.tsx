import Header from "@/components/header";
import ListAccordionPet from "@/components/logs/list-accordion-pet";
import TextOff from "@/components/text-off";
import { baseUrl } from "@/constants/constants";
import { colors, styles, stylesBase } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import { PetHome } from "@/lib/auth/definitions";
import { getStatusBarHeight } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Platform, ScrollView, StatusBar, Text, View } from "react-native";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LogsPage() {
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

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header title="Logs" subtitle="Monitor your pets' meals and weight" />

      <ScrollView
        style={styles.mainScrollViewContainer}
        contentContainerStyle={styles.mainScrollViewContentContainer}
      >
        {isLoading ? (
          <TextOff label="Loading..." />
        ) : !data || data.length === 0 ? (
          <TextOff label="No pets yet..." />
        ) : (
          data.map((pet) => (
            <ListAccordionPet
              key={pet.id}
              petId={pet.id}
              title={pet.name}
              species={pet.species}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
