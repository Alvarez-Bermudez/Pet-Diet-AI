import { baseUrl } from "@/constants/constants";
import { colors, styles, stylesBase } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import { PetHome } from "@/lib/auth/definitions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Divider, Menu } from "react-native-paper";

type MyPetsContainerProps = {
  pets: PetHome[] | undefined;
};

const MyPetsContainer = ({ pets }: MyPetsContainerProps) => {
  return (
    <ScrollView
      style={[styles.mainScrollViewContainer]}
      contentContainerStyle={[
        styles.mainScrollViewContentContainer,
        { gap: 9 },
      ]}
    >
      {!pets || pets.length === 0 ? (
        <Text>No pets yet...</Text>
      ) : (
        pets.map((pet) => <PetSection key={pet.id} data={pet} />)
      )}
    </ScrollView>
  );
};

const PetSection = ({ data }: { data: PetHome }) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () =>
      axios.delete(`${baseUrl}/pets/${data.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data);
        alert(
          `Error: ${error.response?.data.message || "Something went wrong"}`
        );
      } else {
        console.error("Unexpected Error:", error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["my_pets"] });
    },
  });

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  function handleDelete() {
    Alert.alert("Alert", `Are you sure you want to remove ${data.name}?`, [
      { text: "Cancel", style: "cancel", onPress: closeMenu },
      {
        text: "Accept",
        style: "destructive",
        onPress: () => mutation.mutate(),
      },
    ]);
  }

  function handleEdit() {
    closeMenu();
    router.push({ pathname: "/(tabs)/my_pets/[id]", params: { id: data.id } });
  }

  const ButtonMore = () => (
    <View style={stylesLocal.imgMoreContainer}>
      <Image source={require("@/assets/images/more.png")} />
    </View>
  );

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        backgroundColor: colors.surface,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 6,
        }}
      >
        {data.species === "DOG" && (
          <Image source={require("@/assets/images/Dog.png")} />
        )}
        {data.species === "CAT" && (
          <Image source={require("@/assets/images/cat.png")} />
        )}
        <Text style={[stylesBase.bodyBase, { color: colors.textPrimary }]}>
          {data.name}
        </Text>
      </View>

      <Pressable onPress={openMenu}>{!menuVisible && <ButtonMore />}</Pressable>
      {menuVisible && (
        <Menu
          visible={true}
          onDismiss={closeMenu}
          anchor={<ButtonMore />} //XXX
          contentStyle={{
            backgroundColor: colors.background,
          }}
        >
          <Menu.Item onPress={handleEdit} title="Edit" />
          <Divider />
          <Menu.Item
            trailingIcon={"close"}
            onPress={handleDelete}
            title="Delete"
          />
        </Menu>
      )}
    </View>
  );
};

export default MyPetsContainer;

const stylesLocal = StyleSheet.create({
  imgMoreContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
