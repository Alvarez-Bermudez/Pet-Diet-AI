import { Animated, Image, Pressable, Text, View } from "react-native";
import TextOff from "../text-off";
import { colors, stylesBase } from "@/constants/styles";
import { Menu } from "@/lib/auth/definitions";
import RebootIcon from "@/assets/images/Reboot.png";
import {
  Check,
  RefreshCcw,
  RefreshCcwDot,
  RefreshCw,
} from "lucide-react-native";
import axios from "axios";
import { baseUrl } from "@/constants/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth/auth";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";

type MenuCardType = {
  menu: Menu | undefined;
  menuAccepted: boolean | undefined;
};

const MenuCard = ({ menu, menuAccepted }: MenuCardType) => {
  const { id } = useLocalSearchParams();

  const { token } = useAuth();

  const queryClient = useQueryClient();

  const [shouldBlink, setShouldBlink] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (shouldBlink) {
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShouldBlink(false); // Reset trigger after animation
      });
    }
  }, [shouldBlink]);

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surface, colors.primary],
  });

  const mutationMenuGenerate = useMutation({
    mutationFn: () =>
      axios.post(
        `${baseUrl}/pets/${id}/diets/menu/generate`,
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
      setShouldBlink(true);
      queryClient.invalidateQueries({ queryKey: ["pet", id] });
    },
  });

  const mutationMenuAccept = useMutation({
    mutationFn: () =>
      axios.post(
        `${baseUrl}/pets/${id}/diets/menu/accept`,
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
      queryClient.invalidateQueries({ queryKey: ["pet", id] });
      queryClient.invalidateQueries({ queryKey: ["dietsMenuHistory", id] });
    },
  });

  return (
    <Animated.View
      style={[
        {
          width: "100%",

          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
        },
        { backgroundColor },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            stylesBase.caption,
            { fontSize: 13, color: colors.textSecondary },
          ]}
        >
          Suggested Menu by Diet Type
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Pressable
            style={{ paddingHorizontal: 6, paddingVertical: 2 }}
            onPress={() => {
              mutationMenuGenerate.mutate();
            }}
          >
            {/* <Image source={RebootIcon} /> */}
            <RefreshCcw size={20} color={colors.accent} />
          </Pressable>
          {menu && (
            <Pressable
              style={{ paddingHorizontal: 6, paddingVertical: 2 }}
              onPress={() => {
                mutationMenuAccept.mutate();
              }}
            >
              <Check
                size={20}
                color={!menuAccepted ? colors.primary : colors.success}
              />
            </Pressable>
          )}
        </View>
      </View>

      {menu ? (
        <View style={{ gap: 4 }}>
          <Text style={[stylesBase.bodyBase, { color: colors.textPrimary }]}>
            {menu.title}:
          </Text>
          {menu.meals.map((meal) => (
            <Text
              key={meal.slice(0, 20)}
              style={[
                stylesBase.bodyBase,
                { color: colors.textPrimary, textAlign: "justify" },
              ]}
            >
              • {` ${meal}`}
            </Text>
          ))}
        </View>
      ) : (
        <TextOff label="No menu yet..." />
      )}
    </Animated.View>
  );
};

export default MenuCard;
