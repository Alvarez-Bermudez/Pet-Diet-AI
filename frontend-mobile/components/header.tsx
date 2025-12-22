import { colors, stylesBase } from "@/constants/styles";
import { Image, Text, View } from "react-native";

type HeaderProps = { title: string; subtitle: string; iconBack?: boolean };
const Header = ({ title, subtitle, iconBack = false }: HeaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 8,
        width: "100%",
      }}
    >
      {iconBack && (
        <Image source={require("@/assets/images/chevron-left-primary.png")} />
      )}
      <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
        <Text
          style={[stylesBase.h3, { color: colors.primary, lineHeight: 30 }]}
        >
          {title}
        </Text>
        <Text style={[stylesBase.small, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

export default Header;
