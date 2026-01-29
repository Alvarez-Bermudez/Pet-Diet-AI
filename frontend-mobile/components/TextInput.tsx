import { colors } from "@/constants/styles";
import { Dispatch, SetStateAction } from "react";
import { Image, ImageSourcePropType, TextInput, View } from "react-native";

const TextInputWithIcon = ({
  iconPath,
  value,
  setValue,
  placeholder,
  secureTextEntry = false,
}: {
  iconPath: ImageSourcePropType;
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  placeholder: string;
  secureTextEntry?: boolean;
}) => {
  return (
    <View className="w-full flex-row items-center px-2 py-2 rounded-[5px] bg-surface   overflow-hidden">
      <Image source={iconPath} />
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        className="w-full p-2 text-textPrimary no-underline bg-surface rounded-[5px]"
        placeholderTextColor={"#C5C5C5"}
        style={{ fontFamily: "Nunito_500Medium" }}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const TextInputX = ({
  value,
  setValue,
  placeholder,
  secureTextEntry = false,
}: {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  placeholder: string;
  secureTextEntry?: boolean;
}) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
        backgroundColor: colors.surface,
        overflow: "hidden",
      }}
    >
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        style={{
          width: "100%",
          paddingHorizontal: 8,
          color: colors.textPrimary,
          textDecorationLine: "none",
          backgroundColor: colors.surface,
          borderRadius: 5,
          fontFamily: "Nunito_500Medium",
        }}
        placeholderTextColor={"#C5C5C5"}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export { TextInputWithIcon, TextInputX };
