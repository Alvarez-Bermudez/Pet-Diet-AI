import Header from "@/components/header";
import MenuCard from "@/components/logs/menu-card";
import { baseUrl } from "@/constants/constants";
import { styles } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import { Menu, PetByIdEntity } from "@/lib/auth/definitions";
import { formatDateUS, getStatusBarHeight } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

type MenuEntity = {
  id: string;
  petId: string;
  date: string;
  menu: string;
};

export default function HistoryMenuById() {
  const { petId, menuId } = useLocalSearchParams();
  const { token } = useAuth();
  const [menu, setMenu] = useState<Menu>();
  const [dataMenu, setDataMenu] = useState<MenuEntity>();

  const {
    data: pet,
    isLoading: isLoadingPet,
    error: errorPet,
  } = useQuery<PetByIdEntity>({
    queryKey: ["pet", petId],
    queryFn: () =>
      axios
        .get<PetByIdEntity>(`${baseUrl}/pets/${petId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const {
    data: _dataMenu,
    isLoading: isLoadingMenu,
    error: errorMenu,
  } = useQuery<MenuEntity>({
    queryKey: ["menu", menuId],
    queryFn: () =>
      axios
        .get<MenuEntity>(`${baseUrl}/pets/${petId}/diets/history/${menuId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    if (_dataMenu) {
      setDataMenu(_dataMenu);
      const rawMenu = _dataMenu.menu;

      if (rawMenu) {
        const cleanMenu = rawMenu
          .replace(/json\n?|\n?/g, "")
          .replaceAll("```", "")
          .replaceAll("**", "")
          .replaceAll("* ", "- ")
          .replaceAll("*", "");
        const menu = JSON.parse(cleanMenu);

        // console.log(`string menu: ${JSON.stringify(menu, null, 2)}`);
        setMenu(menu);
      }
    }
  }, [_dataMenu]);

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={[styles.layout, { gap: 20, paddingTop: statusBarHeight }]}>
      <Header
        title={pet?.name ?? ""}
        subtitle={`Menu ${dataMenu?.date && formatDateUS(dataMenu.date)}`}
        iconBack
      />
      <ScrollView
        style={[styles.mainScrollViewContainer, { paddingHorizontal: 20 }]}
        contentContainerStyle={[
          styles.mainScrollViewContentContainer,
          { gap: 8 },
        ]}
      >
        <MenuCard menu={menu} />
      </ScrollView>
    </View>
  );
}
