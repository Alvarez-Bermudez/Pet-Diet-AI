import Header from "@/components/header";
import TracksCard from "@/components/logs/tracks-card";
import { baseUrl } from "@/constants/constants";
import { colors, styles, stylesBase } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import { PetByIdEntity, WeightTrackEntity } from "@/lib/auth/definitions";
import { getStatusBarHeight } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { TrendingDown, TrendingUp } from "lucide-react-native";
import { useEffect, useState } from "react";

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WeightTrackingScreen() {
  const { id } = useLocalSearchParams();

  const { token } = useAuth();

  const [dataTracks, setDataTracks] = useState<
    WeightTrackEntity[] | undefined
  >();

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
    data: _dataTrack,
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

  useEffect(() => {
    setDataTracks(_dataTrack?.reverse());
  }, [_dataTrack]);

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header title={pet?.name ?? ""} subtitle="Weight tracking" iconBack />
      <ScrollView
        style={[styles.mainScrollViewContainer, { paddingHorizontal: 20 }]}
        contentContainerStyle={styles.mainScrollViewContentContainer}
      >
        <ReviewCard weightTracks={dataTracks} />
        <TracksCard tracks={dataTracks} />
      </ScrollView>
    </View>
  );
}

const ReviewCard = ({
  weightTracks,
}: {
  weightTracks: WeightTrackEntity[] | undefined;
}) => {
  const [weightLb, setWeightLb] = useState<number>();
  const [weightKg, setWeightKg] = useState<number>();
  const [percentage, setPercentage] = useState<number>();
  const [color, setColor] = useState<string>();

  useEffect(() => {
    if (weightTracks?.length && weightTracks.length > 2) {
      const weights = weightTracks;
      const color =
        weights[0].weight - weights[1].weight > 0
          ? colors.success
          : colors.error;

      const weightKg = Math.abs(weights[0].weight - weights[1].weight);

      const percentage = Math.abs((weightKg / weights[1].weight) * 100);

      const weightLb = weightKg * 2.2;

      setWeightKg(weightKg);
      setWeightLb(weightLb);
      setPercentage(percentage);
      setColor(color);
    }
  }, [weightTracks]);

  const TrendingIcon =
    color === colors.success ? (
      <TrendingUp color={color} size={24} />
    ) : (
      <TrendingDown color={color} size={24} />
    );

  return (
    weightTracks && (
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          backgroundColor: colors.surface,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 12,
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          {TrendingIcon}
          <Text style={[stylesBase.caption, { color: color }]}>
            {weightKg?.toFixed(2)} Kg
          </Text>
        </View>

        <View style={{ justifyContent: "center" }}>
          <Text style={[stylesBase.buttonText, { fontSize: 18 }]}>
            {weightTracks[0].weight} Kg
          </Text>

          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            {TrendingIcon}
            <Text style={[stylesBase.caption, { color: color }]}>
              {percentage?.toFixed(2)}%
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          {TrendingIcon}
          <Text style={[stylesBase.caption, { color: color }]}>
            {weightLb?.toFixed(2)} Lb
          </Text>
        </View>
      </View>
    )
  );
};
