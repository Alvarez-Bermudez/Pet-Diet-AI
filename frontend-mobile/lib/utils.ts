import { Platform, StatusBar } from "react-native";

export function getStatusBarHeight() {
  return Platform.OS === "android" ? StatusBar.currentHeight : 0;
}
