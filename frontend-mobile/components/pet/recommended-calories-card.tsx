import { colors, stylesBase } from "@/constants/styles";
import { Text, View } from "react-native";

const RecommendedCaloriesCard = ({
  recommendedCalories,
}: {
  recommendedCalories: number | undefined;
}) => {
  return (
    <>
      {recommendedCalories && (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 30,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.surface,
            borderRadius: 12,
          }}
        >
          <Text
            style={[
              stylesBase.buttonText,
              { fontSize: 19, color: colors.primary },
            ]}
          >
            {recommendedCalories} kcal/day
          </Text>
          <Text
            style={[
              stylesBase.caption,
              { fontSize: 15, color: colors.textPrimary },
            ]}
          >
            Recommended calories
          </Text>
        </View>
      )}
    </>
  );
};

export default RecommendedCaloriesCard;
