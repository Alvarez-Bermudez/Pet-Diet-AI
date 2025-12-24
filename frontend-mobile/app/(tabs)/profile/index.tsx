import Header from "@/components/header";
import { styles } from "@/constants/styles";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={[styles.layout, { gap: 20 }]}>
      <Header title="Profile" subtitle="Manage your profile and account" />
    </SafeAreaView>
  );
}
