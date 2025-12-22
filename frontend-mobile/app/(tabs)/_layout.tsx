import { colors } from "@/constants/styles";
import { Stack, Tabs } from "expo-router";
// import dogIcon from '../../assets/images/Dog.svg'
import { Image } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          padding: 5,
          fontFamily: "Nunito_700Bold",
          fontSize: 12,
          fontWeight: "700",
        },
        tabBarIconStyle: {
          padding: 3,
        },
        tabBarItemStyle: {
          padding: 12,
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          padding: 5,
          height: "13%",
          shadowColor: "#FF6F61",
        },
      }}
    >
      <Tabs.Screen
        name="(pet)"
        options={{
          title: "Pet",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image source={require("../../assets/images/Dog-selected.png")} />
            ) : (
              <Image source={require("../../assets/images/Dog.png")} />
            ),
        }}
      />
      <Tabs.Screen
        name="my_pets"
        options={{
          title: "My pets",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={require("../../assets/images/my-pets-selected.png")}
              />
            ) : (
              <Image source={require("../../assets/images/my-pets.png")} />
            ),
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          title: "Logs",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={require("../../assets/images/logs-selected.png")}
              />
            ) : (
              <Image source={require("../../assets/images/logs.png")} />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={require("../../assets/images/profile-selected.png")}
              />
            ) : (
              <Image source={require("../../assets/images/profile.png")} />
            ),
        }}
      />
    </Tabs>
  );
}
