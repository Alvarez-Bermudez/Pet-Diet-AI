import RightArrowPrimary from "@/assets/images/right-arrow-primary.png";
import { colors, stylesBase } from "@/constants/styles";
import { Image, Pressable, Text, View } from "react-native";

const TrackingActionsContainer = () => {
  return (
    <View
      style={{
        width: "100%",
        padding: 12,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: colors.surface,
        borderRadius: 10,
        gap: 2,
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
        <Text style={[stylesBase.caption, { color: colors.textSecondary }]}>
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
        <ActionContainer title="Daily meal history" onPress={() => {}} />
        <ActionContainer title="Weight tracking" onPress={() => {}} />
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
  return (
    <Pressable onPress={onPress} style={{ width: "100%" }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 4,
        }}
      >
        <Text style={[stylesBase.bodyBase]}>{title}</Text>
        <Image source={RightArrowPrimary} />
      </View>
    </Pressable>
  );
};
