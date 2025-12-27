import { colors, stylesBase } from "@/constants/styles";
import { Text } from "react-native";

const TextOff = ({ label }: { label: string }) => {
  return (
    <Text
      style={[
        stylesBase.caption,
        { color: colors.textSecondary, width: "100%", paddingHorizontal: 8 },
      ]}
    >
      {label}
    </Text>
  );
};

export default TextOff;
