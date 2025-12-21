import { styles } from "@/constants/styles";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import clsx from "clsx";
import { Checkbox, TextInput as TextInputPaper } from "react-native-paper";
import { TextInputWithIcon } from "@/components/TextInput";
import emailIcon from "../../assets/images/Email.png";
import lockIcon from "../../assets/images/Lock.png";
import { useRouter } from "expo-router";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  return (
    <SafeAreaView className="relative flex-1 px-5 py-5 justify-center items-center bg-background gap-[30px]">
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

      <View className="w-full gap-5">
        <View className="gap-3.5">
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
        </View>
        <View className="flex-row justify-between items-center w-full">
          <View className=" flex-row justify-start items-center">
            <Checkbox
              status={rememberMe ? "checked" : "unchecked"}
              onPress={() => {
                setRememberMe(!rememberMe);
              }}
              color="#7D7D7D"
              uncheckedColor="#7D7D7D"
            />
            <Text
              className="text-[14px] text-textSecondary"
              style={{ fontFamily: "Nunito_400Regular" }}
            >
              Remember me
            </Text>
          </View>
          <Text
            className="text-[14px] text-primary"
            style={{ fontFamily: "Nunito_400Regular" }}
          >
            Forgot password?
          </Text>
        </View>
      </View>

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

      {/* <View className="w-full flex-row justify-center">
        <Text
          className="text-caption text-textTertiary"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          or
        </Text>
      </View> */}

      <View className="absolute flex-row justify-center bottom-16">
        <Text
          className="text-bodyBase text-textPrimary"
          style={{ fontFamily: "Nunito_400Regular" }}
        >
          Not a member?{" "}
        </Text>

        <Pressable onPress={() => router.push("/(auth)/signup")}>
          <Text
            className="text-bodyBase text-primary"
            style={{ fontFamily: "Nunito_400Regular" }}
          >
            Create new account
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
