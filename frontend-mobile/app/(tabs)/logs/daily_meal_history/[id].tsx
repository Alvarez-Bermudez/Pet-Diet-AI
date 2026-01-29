import Header from "@/components/header";
import TextOff from "@/components/text-off";
import { baseUrl } from "@/constants/constants";
import { colors, pressButtonOpacity, styles } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import { PetByIdEntity } from "@/lib/auth/definitions";
import { formatDateUS, getStatusBarHeight } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import RightArrowIcon from "@/assets/images/right-arrow-primary.png";
import { useState } from "react";

type MenuHistoryEntity = {
  id: string;
  petId: string;
  date: string;
};

const DailyMealHistoryScreen = () => {
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
    data: menuHistoryData,
    isLoading: menuHistoryIsLoading,
    error: menuHistoryError,
  } = useQuery<MenuHistoryEntity[]>({
    queryKey: ["dietsMenuHistory", id],
    queryFn: () =>
      axios
        .get<MenuHistoryEntity[]>(`${baseUrl}/pets/${id}/diets/history`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const statusBarHeight = getStatusBarHeight();
  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header title={pet?.name ?? ""} subtitle="Daily meal history" iconBack />
      <ScrollView
        style={[styles.mainScrollViewContainer, { paddingHorizontal: 20 }]}
        contentContainerStyle={[
          styles.mainScrollViewContentContainer,
          { gap: 8 },
        ]}
      >
        {menuHistoryData && menuHistoryData.length !== 0 ? (
          <>
            {menuHistoryData.map((history) => (
              <ItemHistory key={history.id} history={history} petId={pet?.id} />
            ))}
          </>
        ) : (
          <TextOff label="No history yet..." />
        )}
      </ScrollView>
    </View>
  );
};

const ItemHistory = ({
  history,
  petId,
}: {
  history: MenuHistoryEntity;
  petId?: string;
}) => {
  const [pressed, setPressed] = useState<boolean>();
  const hover = () => setPressed(true);
  const blur = () => setPressed(false);

  return (
    <Pressable
      onPress={() => {
        if (petId) {
          router.push({
            pathname: "/(tabs)/logs/daily_meal_history/[petId]/[menuId]",
            params: {
              petId: petId,
              menuId: history.id,
            },
          });
        }
      }}
      onTouchStart={hover}
      onTouchEnd={blur}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 6,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: pressed ? colors.primary : colors.surface,
          opacity: pressed ? pressButtonOpacity : 1,
          borderRadius: 10,
        }}
      >
        <Text>{formatDateUS(history.date)}</Text>
        <Image source={RightArrowIcon} />
      </View>
    </Pressable>
  );
};

export default DailyMealHistoryScreen;
