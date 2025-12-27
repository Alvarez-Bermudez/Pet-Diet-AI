import Header from "@/components/pet/header";
import RoundedButton from "@/components/rounded-button";
import { TextInputX } from "@/components/TextInput";
import { baseUrl } from "@/constants/constants";
import { styles, stylesBase } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import { UserEntity } from "@/lib/auth/definitions";
import { getStatusBarHeight } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

type UserDto = { name: string; phone?: string | null };

export default function ClearDataModal() {
  const { token } = useAuth();

  const router = useRouter();

  const statusBarHeight = getStatusBarHeight();

  const { data, isLoading, error } = useQuery<UserEntity>({
    queryKey: ["profile"],
    queryFn: () =>
      axios
        .get<UserEntity>(`${baseUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      axios.post(
        `${baseUrl}/users/clear-data`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ),

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
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["pet"] });
      queryClient.invalidateQueries({ queryKey: ["dietsMenuHistory"] });
      queryClient.invalidateQueries({ queryKey: ["menu"] });
      queryClient.invalidateQueries({ queryKey: ["weight"] });
      queryClient.invalidateQueries({ queryKey: ["my_pets"] });
      alert("Data sucessfully cleared");
      router.back();
    },
  });

  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header name="Clear data" />

      <ScrollView
        style={styles.mainScrollViewContainer}
        contentContainerStyle={styles.mainScrollViewContentContainer}
      >
        <Text style={[stylesBase.bodyBase]}>
          Are you sure you want to delete all your data?
        </Text>
      </ScrollView>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 14,
          width: "100%",
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
          onPress={() => {
            mutation.mutate();
          }}
        />
      </View>
    </View>
  );
}
