import { colors, styles } from "@/constants/styles";
import { Stack, Tabs } from "expo-router";
// import dogIcon from '../../assets/images/Dog.svg'
import { Image, Text } from "react-native";

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

          //Sombra
          elevation: 8, // Android sombra
          shadowColor: "#ff0000", // iOS sombra
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          borderTopWidth: 0, // opcional para quitar el borde superior por defecto
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
          position: "relative",
        },
      }}
    >
      <Tabs.Screen
        name="(pet)"
        options={{
          title: "Pet",
          headerShown: false,
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.tabBarLabelStyle}>Pet</Text> : null,
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
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={styles.tabBarLabelStyle}>My Pets</Text>
            ) : null,
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
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.tabBarLabelStyle}>Logs</Text> : null,
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
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={styles.tabBarLabelStyle}>Profile</Text>
            ) : null,
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
