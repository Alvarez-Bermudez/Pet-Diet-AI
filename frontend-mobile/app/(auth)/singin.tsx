import { styles } from "@/constants/styles";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox, TextInput as TextInputPaper } from "react-native-paper";
import { TextInputWithIcon } from "@/components/TextInput";
import emailIcon from "../../assets/images/Email.png";
import lockIcon from "../../assets/images/Lock.png";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SIGN_IN_EMAIL_KEY,
  SIGN_IN_PASSWORD_KEY,
  SIGN_IN_REMEMBER_ME_KEY,
} from "@/constants/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/constants/constants";
import { AuthContext, useAuth } from "@/lib/auth/auth";

type SignInDto = {
  email: string;
  password: string;
};

export default function SigninPage() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState<boolean>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { login, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    async function updateStates() {
      const rememberMe =
        (await AsyncStorage.getItem(SIGN_IN_REMEMBER_ME_KEY)) === "true"
          ? true
          : false;

      setRememberMe(rememberMe);
      if (rememberMe) {
        const _email = (await AsyncStorage.getItem(SIGN_IN_EMAIL_KEY)) ?? "";
        const _password =
          (await AsyncStorage.getItem(SIGN_IN_PASSWORD_KEY)) ?? "";
        setEmail(_email);
        setPassword(_password);
      }
    }
    updateStates();
  }, []);

  useEffect(() => {
    if (isAuthenticated) router.push("/(tabs)/(pet)");
  }, [isAuthenticated]);

  async function handleSubmit() {
    console.log("Sign in pressed!");

    await AsyncStorage.setItem(SIGN_IN_REMEMBER_ME_KEY, String(rememberMe));

    if (rememberMe) {
      if (email) await AsyncStorage.setItem(SIGN_IN_EMAIL_KEY, email);
      if (password) await AsyncStorage.setItem(SIGN_IN_PASSWORD_KEY, password);
    }

    if (!email || !password) {
      Alert.alert(
        "Failed to sign in",
        "Email or password fields are incomplete"
      );
      return;
    }

    await login(email, password);
  }

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
            placeholder="Enter your email..."
          />

          <TextInputWithIcon
            value={password}
            setValue={setPassword}
            iconPath={lockIcon}
            placeholder="Enter your password..."
            secureTextEntry
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

      <Pressable className="w-full" onPress={handleSubmit}>
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
