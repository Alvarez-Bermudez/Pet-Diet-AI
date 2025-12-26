import Header from "@/components/header";
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

export default function EditProfileScreen() {
  const { token } = useAuth();

  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string | null>();

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

  useEffect(() => {
    if (data) {
      setName(data.name);
      setPhone(data.phone);
    }
  }, [data]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (userDto: UserDto) =>
      axios.patch(`${baseUrl}/users/me`, userDto, {
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
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.back();
    },
  });

  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header title="Profile" subtitle="Edit profile info" iconBack />

      <ScrollView
        style={styles.mainScrollViewContainer}
        contentContainerStyle={styles.mainScrollViewContentContainer}
      >
        <View style={{ gap: 8 }}>
          <Text style={[stylesBase.small]}>Full name:</Text>
          <TextInputX
            placeholder="Enter name..."
            value={name}
            setValue={setName}
          />
        </View>
        <View style={{ gap: 8 }}>
          <Text style={[stylesBase.small]}>Phone number:</Text>
          <TextInputX
            placeholder="Enter phone number..."
            value={phone}
            setValue={setPhone}
          />
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
            if (name) mutation.mutate({ name, phone });
          }}
        />
      </View>
    </View>
  );
}
