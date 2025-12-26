import { Platform, StatusBar } from "react-native";

export function getStatusBarHeight() {
  return Platform.OS === "android" ? StatusBar.currentHeight : 0;
}

export function formatDateUS(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
