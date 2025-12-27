import Header from "@/components/header";
import { TextInputX } from "@/components/TextInput";
import { colors, styles, stylesBase } from "@/constants/styles";
import { ActivityLevel, CreatePetDto, Species } from "@/lib/auth/definitions";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import ActivityLevelSlider from "@/components/my-pets/ActivityLevelSlider";
import RoundedButton from "@/components/rounded-button";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { baseUrl } from "@/constants/constants";
import { useAuth } from "@/lib/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getStatusBarHeight } from "@/lib/utils";
import Spinner from "react-native-loading-spinner-overlay";

const OPTIONS = [
  { label: "Kg", value: "kg" },
  { label: "lb", value: "lb" },
];
const ActivityLevelValues = ["LOW", "MEDIUM", "HIGH"];

export default function AddNewPetPage() {
  const router = useRouter();

  const [name, setName] = useState<string>();
  const [speciesChecked, setSpeciesChecked] = useState<Species>("DOG");
  const [breed, setBreed] = useState<string>();
  const [currentWeight, setCurrentWeight] = useState<number>();
  const [weightMeasureUnit, setWeightMeasureUnit] = useState<string>();
  const [activityLevelValue, setActivityLevelValue] = useState<number>(1);

  //states for calendar-picker
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const { token } = useAuth();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (petDto: CreatePetDto) =>
      axios.post(`${baseUrl}/pets`, petDto, {
        headers: { Authorization: `Bearer ${token}` },
      }),
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
    onSuccess: (data) => {
      console.log(`pet created: ${JSON.stringify(data.data, null, 2)}`);
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["my_pets"] });
      router.back();
    },
  });

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowCalendar(false);
  };

  function handleSubmit() {
    if (!name || !speciesChecked || !breed || !currentWeight || !date) {
      Alert.alert(
        "Alert",
        "Failed to add pet. There's some values without any values"
      );
      return;
    }

    if (Number.isNaN(Number(currentWeight))) {
      alert("Failed to create pet. Current weight must be a number");
      return;
    }

    const newPet = {
      name,
      species: speciesChecked,
      breed,
      birthDate: date.toISOString(),
      currentWeight: Number(currentWeight),
      activityLevel: ActivityLevelValues[activityLevelValue] as ActivityLevel,
    };

    mutation.mutate(newPet);
  }

  const statusBarHeight = getStatusBarHeight();

  return (
    <>
      <Spinner
        visible={mutation.isPending}
        textContent={"Loading..."}
        textStyle={{ ...stylesBase.buttonText, color: "#fff" }}
        overlayColor="rgba(0, 0, 0, 0.4)"
        animation="fade"
      />

      <View style={[styles.layout, { gap: 25, paddingTop: statusBarHeight }]}>
        <Header title="Add Pet" subtitle="Add new pet" iconBack />

        {/* Body */}
        <ScrollView
          style={styles.mainScrollViewContainer}
          contentContainerStyle={styles.mainScrollViewContentContainer}
        >
          {/* Form */}
          <View style={{ gap: 25, width: "100%" }}>
            <View
              style={{
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <Text style={[stylesBase.small, { color: colors.textPrimary }]}>
                Name
              </Text>
              <TextInputX
                value={name}
                setValue={setName}
                placeholder="Enter name..."
              />
            </View>

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
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <RadioButton
                    value="DOG"
                    color={colors.primary}
                    status={speciesChecked === "DOG" ? "checked" : "unchecked"}
                    onPress={() => setSpeciesChecked("DOG")}
                  />
                  <Text
                    style={[stylesBase.small, { color: colors.textPrimary }]}
                  >
                    Dog
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <RadioButton
                    value="CAT"
                    color={colors.primary}
                    status={speciesChecked === "CAT" ? "checked" : "unchecked"}
                    onPress={() => setSpeciesChecked("CAT")}
                  />
                  <Text
                    style={[stylesBase.small, { color: colors.textPrimary }]}
                  >
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
              <Pressable
                onPress={() => {
                  setShowCalendar(true);
                }}
              >
                <Image source={require("@/assets/images/calendar.png")} />
              </Pressable>
              {showCalendar && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                  accentColor={colors.primary}
                  textColor={colors.primary}
                />
              )}
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
          </View>
        </ScrollView>

        {/* Action buttons */}
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 10,
          }}
        >
          <RoundedButton
            label="Cancelar"
            variant="outline"
            onPress={() => router.back()}
          />
          <RoundedButton
            label="Aceptar"
            variant="default"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </>
  );
}
