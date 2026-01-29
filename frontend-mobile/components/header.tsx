import { colors, stylesBase } from "@/constants/styles";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type HeaderProps = { title: string; subtitle: string; iconBack?: boolean };
const Header = ({ title, subtitle, iconBack = false }: HeaderProps) => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 8,
        width: "100%",
      }}
    >
      {iconBack && (
        <Pressable onPress={() => router.back()}>
          <Image source={require("@/assets/images/chevron-left-primary.png")} />
        </Pressable>
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
