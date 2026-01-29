import { WeightTrackEntity } from "@/lib/auth/definitions";
import { Text, View } from "react-native";
import TextOff from "../text-off";
import { formatDateUS } from "@/lib/utils";
import { colors, stylesBase } from "@/constants/styles";

const TracksCard = ({
  tracks,
}: {
  tracks: WeightTrackEntity[] | undefined;
}) => {
  return tracks && tracks.length !== 0 ? (
    <View style={{ gap: 6 }}>
      <Text style={[stylesBase.caption, { color: colors.textSecondary }]}>
        Tracking
      </Text>
      {tracks?.map((track) => (
        <View
          key={track.id}
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[stylesBase.bodyBase]}>{formatDateUS(track.date)}</Text>
          <Text style={[stylesBase.bodyBase]}>{track.weight} Kg</Text>
        </View>
      ))}
    </View>
  ) : (
    <>
      <TextOff label="No tracks yet..." />
    </>
  );
};

export default TracksCard;
