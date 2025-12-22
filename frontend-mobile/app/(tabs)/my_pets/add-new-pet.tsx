import Header from "@/components/header";
import { TextInputX } from "@/components/TextInput";
import { colors, styles, stylesBase } from "@/constants/styles";
import { Species } from "@/lib/auth/definitions";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import ActivityLevelSlider from "@/components/my-pets/ActivityLevelSlider";

const OPTIONS = [
  { label: "Kg", value: "kg" },
  { label: "lb", value: "lb" },
];

export default function AddNewPetPage() {
  const [speciesChecked, setSpeciesChecked] = useState<Species>("DOG");
  const [breed, setBreed] = useState<string>();
  const [currentWeight, setCurrentWeight] = useState<number>();
  const [weightMeasureUnit, setWeightMeasureUnit] = useState<string>();
  const [activityLevelValue, setActivityLevelValue] = useState<number>(1);

  return (
    <SafeAreaView style={[styles.layout, { gap: 25 }]}>
      <Header title="Add Pet" subtitle="Add new pet" iconBack />

      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: 6,
          width: "100%",
        }}
      >
        <Text style={[stylesBase.small, { color: colors.textPrimary }]}>
          Species
        </Text>
        <View
          style={{
            paddingHorizontal: 5,
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 50,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <RadioButton
              value="DOG"
              color={colors.primary}
              status={speciesChecked === "DOG" ? "checked" : "unchecked"}
              onPress={() => setSpeciesChecked("DOG")}
            />
            <Text style={[stylesBase.small, { color: colors.textPrimary }]}>
              Dog
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <RadioButton
              value="CAT"
              color={colors.primary}
              status={speciesChecked === "CAT" ? "checked" : "unchecked"}
              onPress={() => setSpeciesChecked("CAT")}
            />
            <Text style={[stylesBase.small, { color: colors.textPrimary }]}>
              Cat
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <Text style={[stylesBase.small, { color: colors.textPrimary }]}>
          Breed
        </Text>
        <TextInputX
          value={breed}
          setValue={setBreed}
          placeholder="Enter breed..."
        />
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text style={[stylesBase.small, { color: colors.textPrimary }]}>
          Date of birth:
        </Text>
        <Pressable>
          <Image source={require("@/assets/images/calendar.png")} />
        </Pressable>
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <Text style={[stylesBase.small, { color: colors.textPrimary }]}>
          Current weight (Kg):
        </Text>
        <TextInputX
          value={currentWeight}
          setValue={setCurrentWeight}
          placeholder="Enter weight..."
        />
      </View>

      <ActivityLevelSlider
        value={activityLevelValue}
        setValue={setActivityLevelValue}
      />
    </SafeAreaView>
  );
}
