import Header from "@/components/header";
import TracksCard from "@/components/logs/tracks-card";
import { baseUrl } from "@/constants/constants";
import { styles } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import { PetByIdEntity, WeightTrackEntity } from "@/lib/auth/definitions";
import { getStatusBarHeight } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeightTrackingScreen() {
  const { id } = useLocalSearchParams();

  const { token } = useAuth();

  const {
    data: pet,
    isLoading: isLoadingPet,
    error: errorPet,
  } = useQuery<PetByIdEntity>({
    queryKey: ["pet", id],
    queryFn: () =>
      axios
        .get<PetByIdEntity>(`${baseUrl}/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const {
    data: dataTrack,
    isLoading: isLoadingTrack,
    error: errorTrack,
  } = useQuery<WeightTrackEntity[]>({
    queryKey: ["weight", id],
    queryFn: () =>
      axios
        .get<WeightTrackEntity[]>(`${baseUrl}/pets/${id}/weights`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header title={pet?.name ?? ""} subtitle="Weight tracking" iconBack />
      <ScrollView
        style={[styles.mainScrollViewContainer, { paddingHorizontal: 20 }]}
        contentContainerStyle={styles.mainScrollViewContentContainer}
      >
        <TracksCard tracks={dataTrack} />
      </ScrollView>
    </View>
  );
}
