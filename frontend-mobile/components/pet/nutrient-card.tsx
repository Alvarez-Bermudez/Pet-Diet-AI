import { colors, stylesBase } from "@/constants/styles";
import { Text, View } from "react-native";

const NutrientCard = ({
  label,
  percentage,
  recommendedCaloriesValue,
}: {
  label: string;
  percentage: number;
  recommendedCaloriesValue: number;
}) => {
  const value = ((percentage / 100.0) * recommendedCaloriesValue).toFixed(0);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 16,
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        backgroundColor: colors.surface,
        borderRadius: 12,
      }}
    >
      <Text
        style={[stylesBase.buttonText, { fontSize: 19, color: colors.primary }]}
      >
        {value} kcal/day
      </Text>
      <Text
        style={[stylesBase.caption, { fontSize: 15, color: colors.primary }]}
      >
        {percentage}%
      </Text>
      <Text
        style={[
          stylesBase.caption,
          { fontSize: 15, color: colors.textPrimary },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default NutrientCard;
