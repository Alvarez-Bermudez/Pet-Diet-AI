import { colors, styles, stylesBase } from "@/constants/styles";
import { Image, ImageSourcePropType, Text, View } from "react-native";

type ProfileInfoItemProps = {
  label: string;
  textData: string;
  imageSource: ImageSourcePropType;
};
const ProfileInfoItem = ({
  label,
  textData,
  imageSource,
}: ProfileInfoItemProps) => {
  return (
    <View
      style={{
        paddingHorizontal: 1,
        paddingVertical: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 9,
        width: "100%",
      }}
    >
      <Image source={imageSource} />
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <Text
          style={[
            stylesBase.caption,
            { fontSize: 12, color: colors.textPrimary },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            stylesBase.bodyBase,
            {
              fontFamily: "Nunito_700Bold",
              color: colors.textPrimary,
            },
          ]}
        >
          {textData}
        </Text>
      </View>
    </View>
  );
};

export default ProfileInfoItem;
