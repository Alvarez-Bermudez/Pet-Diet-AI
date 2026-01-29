import { colors, stylesBase } from "@/constants/styles";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Variant = "default" | "outline";

type RoundedButtonType = {
  label: string;
  variant: Variant;
  onPress: () => void;
};
const RoundedButton = ({ label, variant, onPress }: RoundedButtonType) => {
  const [pressed, setPressed] = useState(false);

  function hover() {
    setPressed(true);
  }
  function blur() {
    setPressed(false);
  }

  const variants = {
    bgColor: {
      default: colors.primary,
      outline: undefined,
    },
    borderWidth: {
      default: undefined,
      outline: 1,
    },
    borderColor: {
      default: undefined,
      outline: colors.primary,
    },
    textColor: {
      default: colors.surface,
      outline: colors.primary,
    },
  };

  return (
    <Pressable onTouchStart={hover} onTouchEnd={blur} onPress={onPress}>
      <View
        style={{
          backgroundColor: variants.bgColor[variant],
          borderWidth: variants.borderWidth[variant],
          borderColor: variants.borderColor[variant],
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: 32,
          paddingVertical: 10,
          paddingHorizontal: 38,
          alignItems: "center",
          opacity: pressed ? 0.7 : 1,
        }}
      >
        <Text
          style={[
            stylesBase.buttonText,
            { color: variants.textColor[variant] },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default RoundedButton;
