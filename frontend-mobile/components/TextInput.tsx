import { Dispatch, SetStateAction } from "react";
import { Image, TextInput, View } from "react-native";

export const TextInputWithIcon = ({
  iconPath,
  value,
  setValue,
}: {
  iconPath: string;
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
}) => {
  return (
    <View className="w-full flex-row items-center px-2 py-2 rounded-[5px] bg-surface   overflow-hidden">
      <Image source={iconPath} />
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder="Enter your email..."
        className="w-full p-2 text-textPrimary no-underline bg-surface rounded-[5px]"
        placeholderTextColor={"#C5C5C5"}
        style={{ fontFamily: "Nunito_500Medium" }}
      />
    </View>
  );
};
