import { styles } from "@/constants/styles";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import clsx from "clsx";
import { Checkbox, TextInput as TextInputPaper } from "react-native-paper";
import { TextInputWithIcon } from "@/components/TextInput";
import emailIcon from "../../assets/images/Email.png";
import lockIcon from "../../assets/images/Lock.png";

export default function SigninPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <SafeAreaView className="relative flex-1 px-5 py-5 justify-center items-center bg-background">
      <View className="gap-1 items-center">
        <Text
          className="font-medium text-h3 text-textPrimary "
          style={{ fontFamily: "Poppins_500Medium" }}
        >
          Sign in
        </Text>
        <Text
          className="text-small text-textPrimary"
          style={{ fontFamily: "Inter_400Regular" }}
        >
          Sign in to your account via email
        </Text>
      </View>

      <TextInputWithIcon
        value={email}
        setValue={setEmail}
        iconPath={emailIcon}
      />

      <TextInputWithIcon
        value={password}
        setValue={setPassword}
        iconPath={lockIcon}
      />

      <Pressable className="w-full" onPress={() => {}}>
        <View className="bg-primary py-3 px-[18px] justify-center flex-row rounded-[13px]">
          <Text
            className="text-buttonText text-surface"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            Sign in
          </Text>
        </View>
      </Pressable>

      <View className="w-full flex-row justify-center">
        <Text
          className="text-caption text-textTertiary"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          or
        </Text>
      </View>

      <View className="absolute flex-row justify-center bottom-16">
        <Text
          className="text-bodyBase text-textPrimary"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          Not a member?{" "}
        </Text>
        <Text
          className="text-bodyBase text-primary"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          Create new account
        </Text>
      </View>
    </SafeAreaView>
  );
}
