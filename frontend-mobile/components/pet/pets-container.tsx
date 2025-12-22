import { colors } from "@/constants/styles";
import { PetHome } from "@/lib/auth/definitions";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

type PetsContainerProps = { pets?: PetHome[] };

const PetsContainer = ({ pets }: PetsContainerProps) => {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        padding: 12,
        borderRadius: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 4,
      }}
    >
      <Text
        style={{
          fontFamily: "Nunito_400Regular",
          fontSize: 12,
          color: colors.textSecondary,
        }}
      >
        My pets
      </Text>
      {!pets || pets.length === 0 ? (
        <Text>No pets yet</Text>
      ) : (
        pets.map((pet) => (
          <PetAction key={pet.id} title={pet.name} onPress={() => {}} />
        ))
      )}
    </View>
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

          justifyContent: "space-between",
          width: "100%",
          backgroundColor: colors.surface,
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
