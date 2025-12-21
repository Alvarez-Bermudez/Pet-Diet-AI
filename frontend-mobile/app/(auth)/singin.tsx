import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SigninPage() {
  return (
    <SafeAreaView className="px-5 py-5 justify-center items-center">
      <View className="gap-1.5">
        <Text
          className="font-medium text-[20px] "
          style={{ fontFamily: "Poppins_500Medium" }}
        >
          Sign in
        </Text>
        <Text className="" style={{ fontFamily: "Inter_400Regular" }}>
          Sign in to your account via email
        </Text>
      </View>

      <TextInput></TextInput>
    </SafeAreaView>
  );
}
