import { colors } from "@/constants/styles";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

type SectionActionType = { title: string; onPress: () => void };

const SectionAction = ({ title, onPress }: SectionActionType) => {
  const [pressed, setPressed] = useState(false);

  function hover() {
    setPressed(true);
  }
  function blur() {
    setPressed(false);
  }

  return (
    <Pressable onTouchStart={hover} onTouchEnd={blur} onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          padding: 12,
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: pressed ? colors.primary : colors.surface,
          borderRadius: 10,
          alignItems: "center",
          opacity: pressed ? 0.3 : 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Nunito_400Regular",
            fontSize: 16,
            color: colors.textPrimary,
          }}
        >
          {title}
        </Text>
        <Image source={require("@/assets/images/right-arrow-primary.png")} />
      </View>
    </Pressable>
  );
};

export default SectionAction;
