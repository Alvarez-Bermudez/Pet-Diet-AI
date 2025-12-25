import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import ChevronLeftTextPrimaryIcon from "@/assets/images/chevron-left-text-primary.png";
import { colors, stylesBase } from "@/constants/styles";

const Header = ({ name }: { name: string }) => {
  const router = useRouter();

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Pressable onPress={() => router.back()}>
        <Image source={ChevronLeftTextPrimaryIcon} />
      </Pressable>
      <Text style={[stylesBase.h2, { color: colors.primary }]}>{name}</Text>
    </View>
  );
};

export default Header;
