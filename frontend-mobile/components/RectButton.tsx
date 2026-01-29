import { colors } from "@/constants/styles";
import { ReactNode, useState } from "react";
import { Pressable, View } from "react-native";

type RectButtonType = {
  children: ReactNode;
  onPress: () => void;
  contentCenter?: boolean;
};

export const RectButton = ({
  children,
  onPress,
  contentCenter = false,
}: RectButtonType) => {
  const [pressed, setPressed] = useState(false);

  function hover() {
    setPressed(true);
  }
  function blur() {
    setPressed(false);
  }

  return (
    <Pressable
      className="w-full "
      onTouchStart={hover}
      onTouchEnd={blur}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          flexDirection: "row",
          justifyContent: contentCenter ? "center" : "space-between",
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 12,
          alignItems: "center",
          opacity: pressed ? 0.7 : 1,
        }}
      >
        {children}
      </View>
    </Pressable>
  );
};
