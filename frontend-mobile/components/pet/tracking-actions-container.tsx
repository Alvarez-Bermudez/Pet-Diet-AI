import RightArrowPrimary from "@/assets/images/right-arrow-primary.png";
import { colors, pressButtonOpacity, stylesBase } from "@/constants/styles";
import { PetByIdEntity } from "@/lib/auth/definitions";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const TrackingActionsContainer = ({
  pet,
}: {
  pet: PetByIdEntity | undefined;
}) => {
  const router = useRouter();

  return (
    <View
      style={{
        width: "100%",
        paddingTop: 12,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: colors.surface,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            stylesBase.caption,
            { color: colors.textSecondary, paddingHorizontal: 12 },
          ]}
        >
          Tracking
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <ActionContainer
          title="Daily meal history"
          onPress={() => {
            if (pet) {
              router.push({
                pathname: "/(tabs)/logs/daily_meal_history/[id]",
                params: { id: pet.id },
              });
            }
          }}
        />
        <ActionContainer
          title="Weight tracking"
          onPress={() => {
            if (pet) {
              router.push({
                pathname: "/(tabs)/logs/weight_tracking/[id]",
                params: { id: pet.id },
              });
            }
          }}
        />
      </View>
    </View>
  );
};

export default TrackingActionsContainer;

const ActionContainer = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  const [pressed, setPressed] = useState<boolean>();

  const hover = () => setPressed(true);
  const blur = () => setPressed(false);

  return (
    <Pressable
      onPress={onPress}
      style={{ width: "100%" }}
      onTouchStart={hover}
      onTouchEnd={blur}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          backgroundColor: pressed ? colors.primary : colors.surface,
          opacity: pressed ? pressButtonOpacity : 1,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 10,
        }}
      >
        <Text style={[stylesBase.bodyBase]}>{title}</Text>
        <Image source={RightArrowPrimary} />
      </View>
    </Pressable>
  );
};
