import { colors, stylesBase } from "@/constants/styles";
import { PetHome } from "@/lib/auth/definitions";
import { Image, Text, View } from "react-native";

type MyPetsContainerProps = {
  pets: PetHome[] | undefined;
};

const MyPetsContainer = ({ pets }: MyPetsContainerProps) => {
  return (
    <View
      style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: 9 }}
    >
      {!pets || pets.length === 0 ? (
        <Text>No pets yet...</Text>
      ) : (
        pets.map((pet) => <PetSection key={pet.id} data={pet} />)
      )}
    </View>
  );
};

const PetSection = ({ data }: { data: PetHome }) => {
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

      <Image source={require("@/assets/images/more.png")} />
    </View>
  );
};

export default MyPetsContainer;
