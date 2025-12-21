import { Dispatch, SetStateAction } from "react";
import { Image, TextInput, View } from "react-native";

export const TextInputWithIcon = ({
  iconPath,
  value,
  setValue,
  placeholder,
  secureTextEntry = false,
}: {
  iconPath: string;
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
