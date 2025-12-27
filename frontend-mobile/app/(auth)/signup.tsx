import { TextInputWithIcon } from "@/components/TextInput";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import profileIcon from "../../assets/images/Customer.png";
import lockIcon from "../../assets/images/Lock.png";
import emailIcon from "../../assets/images/Email.png";
import phoneIcon from "../../assets/images/Phone-number.png";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "@/constants/constants";
import { useAuth } from "@/lib/auth/auth";

type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export default function SignUpPage() {
  const { login } = useAuth();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPasssword, setConfirmPassword] = useState<string>();

  const mutation = useMutation({
    mutationFn: (createUserDto: CreateUserDto) =>
      axios.post(`${baseUrl}/auth/signup`, createUserDto),
    onError: (error) => {
      // Alert.alert("Error", "Something went wrong. Try it again later");
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        alert(
          `Error: ${error.response?.data?.message || "Something went wrong"}`
        );
      } else {
        console.error("Unexpected Error:", error);
      }
    },
    onSuccess: async (data) => {
      await login(email!, password!);
      router.replace("/(tabs)/(pet)");
    },
  });

  function handleSubmit() {
    if (!name || !email || !password || !confirmPasssword) {
      alert("Please complete all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password too short. Length must be greater than 6 characters");
    }

    if (confirmPasssword !== password) {
      alert("Confirm password must be equal to password");
      return;
    }

    mutation.mutate({
      name,
      email,
      password,
      phone: phoneNumber,
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className="h-full"
    >
      <View className="relative  flex-1 px-5 py-5 justify-center items-center bg-background gap-[30px]">
        <View className="gap-1 items-center">
          <Text
            className="font-medium text-h3 text-textPrimary "
            style={{ fontFamily: "Poppins_500Medium" }}
          >
            Sign up
          </Text>
          <Text
            className="text-small text-textPrimary"
            style={{ fontFamily: "Inter_400Regular" }}
          >
            Create an account with your info
          </Text>
        </View>

        <View className="gap-3.5 w-full">
          <TextInputWithIcon
            value={name}
            setValue={setName}
            iconPath={profileIcon}
            placeholder="Enter full name..."
          />
          <TextInputWithIcon
            value={email}
            setValue={setEmail}
            iconPath={emailIcon}
            placeholder="Enter email..."
          />
          <TextInputWithIcon
            value={phoneNumber}
            setValue={setPhoneNumber}
            iconPath={phoneIcon}
            placeholder="Enter phone number..."
          />
        </View>

        <View className="gap-3 items-start w-full">
          <Text
            className="text-caption"
            style={{ fontFamily: "Inter_400Regular", color: "#A9A9A9" }}
          >
            Set your password
          </Text>
          <View className="gap-3.5 items-start w-full">
            <TextInputWithIcon
              value={password}
              setValue={setPassword}
              iconPath={lockIcon}
              placeholder="Enter password..."
              secureTextEntry
            />
            <TextInputWithIcon
              value={confirmPasssword}
              setValue={setConfirmPassword}
              iconPath={lockIcon}
              placeholder="Confirm password..."
              secureTextEntry
            />
          </View>
        </View>

        <Pressable className="w-full" onPress={handleSubmit}>
          <View className="bg-primary py-3 px-[18px] justify-center flex-row rounded-[13px]">
            <Text
              className="text-buttonText text-surface"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Sign up
            </Text>
          </View>
        </Pressable>

        <View className=" flex-row justify-center">
          <Text
            className="text-bodyBase text-textPrimary"
            style={{ fontFamily: "Nunito_400Regular" }}
          >
            Already have an account?{" "}
          </Text>

          <Pressable onPress={() => router.push("/(auth)/singin")}>
            <Text
              className="text-bodyBase text-primary"
              style={{ fontFamily: "Nunito_400Regular" }}
            >
              Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
