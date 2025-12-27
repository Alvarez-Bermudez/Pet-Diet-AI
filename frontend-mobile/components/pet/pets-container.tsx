import { colors } from "@/constants/styles";
import { PetHome } from "@/lib/auth/definitions";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

type PetsContainerProps = { pets?: PetHome[]; isLoading: boolean };

const PetsContainer = ({ pets, isLoading }: PetsContainerProps) => {
  const router = useRouter();

  return (
    <>
      {isLoading ? (
        <>
          <View
            style={{
              backgroundColor: colors.surface,
              padding: 12,
              borderRadius: 10,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 4,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Nunito_400Regular",
                fontSize: 16,
                color: colors.textSecondary,
                width: "100%",
              }}
            >
              Loading
            </Text>
          </View>
        </>
      ) : (
        <View
          style={{
            backgroundColor: colors.surface,
            // padding: 12,
            borderRadius: 10,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            // gap: 8,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito_400Regular",
              fontSize: 12,
              color: colors.textSecondary,
              width: "100%",
              paddingTop: 12,
              paddingHorizontal: 12,
            }}
          >
            My pets
          </Text>
          {!pets || pets.length === 0 ? (
            <Text
              style={{
                fontFamily: "Nunito_400Regular",
                fontSize: 16,
                color: colors.textPrimary,
                width: "100%",
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              No pets yet...
            </Text>
          ) : (
            pets.map((pet) => (
              <PetAction
                key={pet.id}
                title={pet.name}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/(pet)/dashboard/id",
                    params: { id: pet.id },
                  })
                }
              />
            ))
          )}
        </View>
      )}
    </>
  );
};

export default PetsContainer;

type PetActionProps = { title: string; onPress: () => void };

const PetAction = ({ title, onPress }: PetActionProps) => {
  const [pressed, setPressed] = useState(false);

  function hover() {
    setPressed(true);
  }
  function blur() {
    setPressed(false);
  }

  return (
    <Pressable onTouchStart={hover} onTouchEnd={blur} onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 12,
          paddingVertical: 5,
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: pressed ? colors.primary : colors.surface,
          borderRadius: 10,
          alignItems: "center",
          opacity: pressed ? 0.3 : 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Nunito_400Regular",
            fontSize: 16,
            color: colors.textPrimary,
          }}
        >
          {title}
        </Text>
        <Image source={require("@/assets/images/right-arrow-primary.png")} />
      </View>
    </Pressable>
  );
};
