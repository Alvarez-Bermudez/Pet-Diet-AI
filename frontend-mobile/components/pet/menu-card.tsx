import { Image, Pressable, Text, View } from "react-native";
import TextOff from "../text-off";
import { colors, stylesBase } from "@/constants/styles";
import { Menu } from "@/lib/auth/definitions";
import RebootIcon from "@/assets/images/Reboot.png";
import {
  Check,
  RefreshCcw,
  RefreshCcwDot,
  RefreshCw,
} from "lucide-react-native";

const MenuCard = ({ menu }: { menu: Menu | undefined }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: colors.surface,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            stylesBase.caption,
            { fontSize: 13, color: colors.textSecondary },
          ]}
        >
          Suggested Menu by Diet Type
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Pressable style={{ paddingHorizontal: 6, paddingVertical: 2 }}>
            {/* <Image source={RebootIcon} /> */}
            <RefreshCcw size={20} color={colors.accent} />
          </Pressable>
          <Pressable style={{ paddingHorizontal: 6, paddingVertical: 2 }}>
            <Check size={20} color={colors.primary} />
          </Pressable>
        </View>
      </View>

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
