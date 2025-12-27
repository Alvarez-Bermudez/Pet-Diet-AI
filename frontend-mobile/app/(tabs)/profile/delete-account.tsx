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
  const { token, logout } = useAuth();

  const router = useRouter();

  const [password, setPassword] = useState<string>();

  const statusBarHeight = getStatusBarHeight();

  const mutation = useMutation({
    mutationFn: (dto: { password: string }) =>
      axios.post<{ password: string }>(
        `${baseUrl}/users/delete-account`,
        { dto },
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
      logout();
    },
  });

  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header name="Delete account" />

      <ScrollView
        style={styles.mainScrollViewContainer}
        contentContainerStyle={[
          styles.mainScrollViewContentContainer,
          { alignItems: "flex-start" },
        ]}
      >
        <Text style={[stylesBase.bodyBase]}>
          Are you sure you want to delete your account?
        </Text>
        <Text style={[stylesBase.bodyBase]}>
          To confirm, please enter your password:
        </Text>
        <TextInputX
          value={password}
          setValue={setPassword}
          placeholder="Enter password..."
          secureTextEntry
        />
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
            if (password) {
              mutation.mutate({ password });
            }
          }}
        />
      </View>
    </View>
  );
}
