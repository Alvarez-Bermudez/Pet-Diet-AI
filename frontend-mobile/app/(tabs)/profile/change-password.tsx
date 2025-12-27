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

type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};

export default function ClearDataModal() {
  const { token, logout } = useAuth();

  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const statusBarHeight = getStatusBarHeight();

  const mutation = useMutation({
    mutationFn: (dto: ChangePasswordDto) =>
      axios.post(`${baseUrl}/auth/change-password`, dto, {
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
      alert("Password succesfully changed");
      router.back();
    },
  });

  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header name="Delete account" />

      <ScrollView
        style={styles.mainScrollViewContainer}
        contentContainerStyle={[
          styles.mainScrollViewContentContainer,
          { alignItems: "flex-start", gap: 25 },
        ]}
      >
        <View style={{ gap: 12 }}>
          <Text style={[stylesBase.bodyBase]}>
            Please enter your current password:
          </Text>
          <TextInputX
            placeholder="Enter current password..."
            value={currentPassword}
            setValue={setCurrentPassword}
            secureTextEntry
          />
        </View>

        <View style={{ gap: 10 }}>
          <View style={{ gap: 12 }}>
            <Text style={[stylesBase.bodyBase]}>New password:</Text>
            <TextInputX
              placeholder="Enter new password..."
              value={newPassword}
              setValue={setNewPassword}
              secureTextEntry
            />
          </View>
          <View style={{ gap: 12 }}>
            <Text style={[stylesBase.bodyBase]}>Confirm password:</Text>
            <TextInputX
              placeholder="Confirm password..."
              value={confirmPassword}
              setValue={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </View>
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
            if (!newPassword || !currentPassword || !confirmPassword) {
              alert("Please complete all fields");
              return;
            }
            if (currentPassword !== confirmPassword) {
              alert("Confirm password no match new password");
              return;
            }
            mutation.mutate({
              currentPassword,
              newPassword,
            });
          }}
        />
      </View>
    </View>
  );
}
