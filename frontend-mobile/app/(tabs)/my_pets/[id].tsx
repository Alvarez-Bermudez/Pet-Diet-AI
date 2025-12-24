import Header from "@/components/header";
import { TextInputX } from "@/components/TextInput";
import { colors, styles, stylesBase } from "@/constants/styles";
import {
  ActivityLevel,
  CreatePetDto,
  PetByIdEntity,
  Species,
} from "@/lib/auth/definitions";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import ActivityLevelSlider from "@/components/my-pets/ActivityLevelSlider";
import RoundedButton from "@/components/rounded-button";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { baseUrl } from "@/constants/constants";
import { useAuth } from "@/lib/auth/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const OPTIONS = [
  { label: "Kg", value: "kg" },
  { label: "lb", value: "lb" },
];

const ActivityLevelValues = ["LOW", "MEDIUM", "HIGH"];
const ActivityLevelIds = { LOW: 0, MEDIUM: 1, HIGH: 2 };

export default function AddNewPetPage() {
  const { id } = useLocalSearchParams();
  //   console.log(`id: ${id}`);
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const router = useRouter();

  const [name, setName] = useState<string>();
  const [currentWeight, setCurrentWeight] = useState<number>();
  const [weightMeasureUnit, setWeightMeasureUnit] = useState<string>();
  const [activityLevelValue, setActivityLevelValue] = useState<number>(1);

  const { data, isLoading, error } = useQuery<PetByIdEntity>({
    queryKey: ["pet", id],
    queryFn: () =>
      axios
        .get<PetByIdEntity>(`${baseUrl}/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCurrentWeight(data.currentWeight);
      setActivityLevelValue(
        ActivityLevelIds[data.activityLevel as ActivityLevel]
      );
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (petDto: {
      currentWeight: number;
      activityLevel: ActivityLevel;
    }) =>
      axios.patch(`${baseUrl}/pets/${id}`, petDto, {
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
      queryClient.invalidateQueries({ queryKey: ["pet", id] });
      router.back();
    },
  });

  function handleSubmit() {
    if (!currentWeight) {
      Alert.alert(
        "Alert",
        "Failed to add pet. Current weight has not any values"
      );
      return;
    }

    if (Number.isNaN(Number(currentWeight))) {
      alert("Failed to create pet. Current weight must be a number");
      return;
    }

    const newPet = {
      currentWeight: Number(currentWeight),
      activityLevel: ActivityLevelValues[activityLevelValue] as ActivityLevel,
    };

    mutation.mutate(newPet);
  }

  return (
    <SafeAreaView style={[styles.layout, { gap: 25, height: "100%" }]}>
      <Header title={name ?? "Pet"} subtitle="Edit pet" iconBack />

      {/* Body */}
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          height: "93%", //TILY
        }}
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
        {/* Action buttons */}
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
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
    </SafeAreaView>
  );
}
