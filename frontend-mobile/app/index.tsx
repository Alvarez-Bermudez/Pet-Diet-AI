import { Text, View } from "react-native";
import "../global.css";
export default function Index() {
  return (
    <View
      className="bg-amber-200"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
