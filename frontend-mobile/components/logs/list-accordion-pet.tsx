import { colors, stylesBase } from "@/constants/styles";
import { Species } from "@/lib/auth/definitions";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import { List } from "react-native-paper";

type ListAccordionPetProps = { title: string; species: Species; petId: string };

const ListAccordionPet = ({ title, species, petId }: ListAccordionPetProps) => {
  const router = useRouter();

  return (
    <List.Accordion
      title={title}
      left={(props) => (
        <Image
          source={
            species === "DOG"
              ? require("@/assets/images/Dog.png")
              : require("@/assets/images/cat.png")
          }
        />
      )}
      style={{
        width: "100%",
        minWidth: "100%",
        backgroundColor: colors.surface,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 8,
      }}
      titleStyle={[stylesBase.bodyBase, { color: colors.textPrimary }]}
    >
      <List.Item
        title="Weight tracking"
        style={{ backgroundColor: colors.surface, padding: 20 }}
        // contentStyle={{ padding: 4 }}
        titleStyle={[
          stylesBase.caption,
          { fontSize: 15, color: colors.textSecondary },
        ]}
        right={(props) => (
          <Image source={require("@/assets/images/right-arrow-primary.png")} />
        )}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/logs/weight_tracking/[id]",
            params: { id: petId },
          })
        }
      />
      <List.Item
        title="Daily meal history"
        titleStyle={[
          stylesBase.caption,
          { fontSize: 15, color: colors.textSecondary },
        ]}
        right={(props) => (
          <Image source={require("@/assets/images/right-arrow-primary.png")} />
        )}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/logs/daily_meal_history/[id]",
            params: { id: petId },
          })
        }
        style={{
          backgroundColor: colors.surface,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          padding: 20,
        }}
        contentStyle={{ padding: 4 }}
      />
    </List.Accordion>
  );
};

export default ListAccordionPet;
