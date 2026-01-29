import { colors, stylesBase } from "@/constants/styles";
import Slider from "@react-native-community/slider";
import { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";

type ActivityLevelSliderProps = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
};

const ActivityLevelSlider = ({ value, setValue }: ActivityLevelSliderProps) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <Text style={[stylesBase.small, { color: colors.textPrimary }]}>
        Activity level:
      </Text>

      <Slider
        style={{ width: "100%", height: "auto" }}
        minimumValue={0}
        maximumValue={2}
        step={1}
        value={value}
        onValueChange={(value) => setValue(value)}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.secondary}
        thumbTintColor={colors.primary}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 300,
        }}
      >
        <Text style={[stylesBase.small, { color: "#7D7D7D" }]}>Low</Text>
        <Text style={[stylesBase.small, { color: "#7D7D7D" }]}>Medium</Text>
        <Text style={[stylesBase.small, { color: "#7D7D7D" }]}>High</Text>
      </View>
    </View>
  );
};

export default ActivityLevelSlider;
