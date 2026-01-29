import { baseUrl } from "@/constants/constants";
import { colors, styles, stylesBase } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import {
  DailyNutritionalPlan,
  Menu,
  PetByIdEntity,
} from "@/lib/auth/definitions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import TextOff from "@/components/text-off";
import ChevronLeftIcon from "@/assets/images/chevron-left-primary.png";
import ChevronLeftTextPrimaryIcon from "@/assets/images/chevron-left-text-primary.png";
import RebootIcon from "@/assets/images/Reboot.png";
import TrackingActionsContainer from "@/components/pet/tracking-actions-container";
import MenuCard from "@/components/pet/menu-card";
import NutrientCard from "@/components/pet/nutrient-card";
import Header from "@/components/pet/header";
import { getStatusBarHeight } from "@/lib/utils";
import SectionAction from "@/components/pet/section-action";
import RecommendedCaloriesCard from "@/components/pet/recommended-calories-card";

export default function Dashboard() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const router = useRouter();

  const queryClient = useQueryClient();

  const [recommendedCalories, setRecommendedCalories] = useState<number>(); //kcal/day
  const [protein, setProtein] = useState<number>(); //percentage..
  const [fat, setFat] = useState<number>();
  const [carbohydrates, setCarbohydrates] = useState<number>();
  const [menu, setMenu] = useState<Menu>();
  const [menuAccepted, setMenuAccepted] = useState<boolean>();

  const {
    data: pet,
    isLoading,
    error,
  } = useQuery<PetByIdEntity>({
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
    if (pet) {
      if (pet.menuAccepted) setMenuAccepted(pet.menuAccepted);

      const rawDailyNutritionalPlan = pet.dailyNutritionalPlan;
      if (rawDailyNutritionalPlan) {
        const cleanDailyNutritionalPlan = rawDailyNutritionalPlan
          .replace(/json\n?|\n?/g, "")
          .replaceAll("```", "");

        // console.log(`string: ${cleanDailyNutritionalPlan}`);
        const dailyNutritionalPlan: DailyNutritionalPlan = JSON.parse(
          cleanDailyNutritionalPlan
        );
        setRecommendedCalories(
          +dailyNutritionalPlan.recommendedCalories
            .replace("kcal/day", "")
            .replaceAll(" ", "")
        );
        setProtein(+dailyNutritionalPlan.protein.replace("%", ""));
        setFat(+dailyNutritionalPlan.fat.replace("%", ""));
        setCarbohydrates(+dailyNutritionalPlan.carbohydrates.replace("%", ""));
      }

      const rawMenu = pet.menu;
      console.log(rawMenu, rawMenu);
      if (rawMenu) {
      }

      if (rawMenu) {
        const cleanMenu = rawMenu
          .replace(/json\n?|\n?/g, "")
          .replaceAll("```", "")
          .replaceAll("**", "")
          .replaceAll("* ", "- ")
          .replaceAll("*", "")
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
          .replace(/[“”]/g, '"')
          .replace(/[‘’]/g, "'")
          .replaceAll("|", "");

        const menu = JSON.parse(cleanMenu);

        // console.log(`string menu: ${JSON.stringify(menu, null, 2)}`);
        setMenu(menu);
      }
    }
  }, [pet]);

  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={[styles.layout, { paddingTop: statusBarHeight }]}>
      <View style={[styles.layout]}>
        {isLoading ? (
          <TextOff label="Loading..." />
        ) : error ? (
          <TextOff label="Network error. Please try again" />
        ) : (
          <>
            <ScrollView
              style={styles.mainScrollViewContainer}
              contentContainerStyle={styles.mainScrollViewContentContainer}
            >
              <Header name={pet?.name ?? ""} />

              <View className="flex-row w-full items-center justify-end gap-4 flex-wrap">
                <RecommendedCaloriesCard
                  recommendedCalories={recommendedCalories}
                />
                {recommendedCalories && protein && (
                  <NutrientCard
                    label="Protein"
                    percentage={protein}
                    recommendedCaloriesValue={recommendedCalories}
                  />
                )}
              </View>
              {/* Nutrients container */}
              <View className="flex-row w-full items-center justify-end gap-4 flex-wrap">
                {recommendedCalories && fat && (
                  <NutrientCard
                    label="Fat"
                    percentage={fat}
                    recommendedCaloriesValue={recommendedCalories}
                  />
                )}
                {recommendedCalories && carbohydrates && (
                  <NutrientCard
                    label="Carbohydrates"
                    percentage={carbohydrates}
                    recommendedCaloriesValue={recommendedCalories}
                  />
                )}
              </View>
              <MenuCard menu={menu} menuAccepted={menuAccepted} />
              <TrackingActionsContainer pet={pet} />
              <SectionAction
                title="Update weight & pet data"
                onPress={() => {
                  if (pet) {
                    router.push({
                      pathname: `/(tabs)/my_pets/[id]`,
                      params: { id: pet.id },
                    });
                  }
                }}
              />
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

/*
"dailyNutritionalPlan": "```json\n{\n  \"recommendedCalories\": \"850 kcal/day\",\n  \"protein\": \"33%\",\n  \"fat\": \"37%\",\n  \"carbohydrates\": \"30%\"\n}\n```",
  "menu": "```json\n{\n  \"title\": \"Homemade Daily Menu for Weight Gain\",\n  \"meals\": [\n    \"**Meal 1 (Breakfast):** 1/3 cup (approx. 27g) dry rolled oats cooked with water (yields approx. 135g cooked oatmeal), 1 large hard-boiled egg (approx. 50g), 1.5 teaspoons (approx. 6g) olive oil, 1 tablespoon (approx. 15g) pureed canned pumpkin (100% plain).\",\n    \"**Meal 2 (Lunch):** 2.1 ounces (approx. 60g) cooked, lean ground beef (90/10 fat ratio), 1.8 ounces (approx. 50g) cooked and mashed sweet potato, 0.9 ounces (approx. 25g) steamed and finely chopped green beans.\",\n    \"**Meal 3 (Afternoon Meal):** 2.5 ounces (approx. 70g) cooked, boneless, skinless chicken thigh (shredded), 1.8 ounces (approx. 50g) cooked brown rice, 0.9 ounces (approx. 25g) cooked and pureed carrots.\",\n    \"**Meal 4 (Dinner):** 4.2 ounces 
(approx. 120g) low-lactose cottage cheese, 2.1 ounces (approx. 60g) cooked quinoa, 0.7 ounces (approx. 20g) cooked and finely chopped chik 
en liver, 0.5 teaspoon (approx. 2.5g) salmon oil.\"\n  ]\n}\n```"
*/
