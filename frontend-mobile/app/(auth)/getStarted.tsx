import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GetStartedPage() {
  return (
    <SafeAreaView className="p-5 justify-between items-center flex-1 bg-background">
      <View className="gap-2.5 items-start">
        <Image
          source={require("../../assets/images/get-started-logo.png")}
          style={{ borderRadius: 15 }}
        />
        <Text
          className=" text-bodyBase text-textPrimary text-center "
          style={{ fontFamily: "Nunito_500Medium" }}
        >
          Personalized AI diets for underweight pets. Track daily meals and
          monitor your pet's weight with ease.
        </Text>
      </View>

      <Pressable className="w-full">
        <View className="bg-primary py-3 px-[52px] justify-center flex-row rounded-[13px]">
          <Text
            className="text-buttonText text-surface"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            Get started
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
