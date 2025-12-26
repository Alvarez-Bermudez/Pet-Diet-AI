import { Animated, Image, Pressable, Text, View } from "react-native";
import TextOff from "../text-off";
import { colors, stylesBase } from "@/constants/styles";
import { Menu } from "@/lib/auth/definitions";

type MenuCardType = {
  menu: Menu | undefined;
};

const MenuCard = ({ menu }: MenuCardType) => {
  return (
    <View
      style={[
        {
          width: "100%",

          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
        },
        { backgroundColor: colors.surface },
      ]}
    >
      {menu ? (
        <View style={{ gap: 4 }}>
          <Text style={[stylesBase.bodyBase, { color: colors.textPrimary }]}>
            {menu.title}:
          </Text>
          {menu.meals.map((meal) => (
            <Text
              key={meal.slice(0, 20)}
              style={[
                stylesBase.bodyBase,
                { color: colors.textPrimary, textAlign: "justify" },
              ]}
            >
              • {` ${meal}`}
            </Text>
          ))}
        </View>
      ) : (
        <TextOff label="No menu yet..." />
      )}
    </View>
  );
};

export default MenuCard;
