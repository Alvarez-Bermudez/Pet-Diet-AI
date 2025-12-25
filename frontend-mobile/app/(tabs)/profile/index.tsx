import Header from "@/components/header";
import ProfileInfoItem from "@/components/profile/profile-info-item";
import { baseUrl } from "@/constants/constants";
import { colors, styles, stylesBase } from "@/constants/styles";
import { useAuth } from "@/lib/auth/auth";
import { UserEntity } from "@/lib/auth/definitions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileIcon from "@/assets/images/profile-text-primary.png";
import EmailIcon from "@/assets/images/Email-text-primary.png";
import PhoneNumberIcon from "@/assets/images/phone-text-primary.png";
import RightArrowIcon from "@/assets/images/right-arrow-primary.png";
import RightArrowDestructiveIcon from "@/assets/images/right-arrow-destructive.png";

export default function Profile() {
  const { token } = useAuth();

  const { data, isLoading, error } = useQuery<UserEntity>({
    queryKey: ["profile"],
    queryFn: () =>
      axios
        .get<UserEntity>(`${baseUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data),
  });

  return (
    <SafeAreaView style={[styles.layout, { gap: 20 }]}>
      <Header title="Profile" subtitle="Manage your profile and account" />

      <View
        style={{
          width: "100%",
          backgroundColor: colors.surface,
          paddingHorizontal: 12,
          paddingVertical: 11,
          gap: 13,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={[stylesBase.h3, { color: colors.textPrimary }]}>
            Profile info
          </Text>
          <Text style={[stylesBase.caption, { color: colors.textPrimary }]}>
            Edit
          </Text>
        </View>

        <ProfileInfoItem
          label="Full Name"
          textData={data?.name ?? ""}
          imageSource={ProfileIcon}
        />
        <ProfileInfoItem
          label="Email"
          textData={data?.email ?? ""}
          imageSource={EmailIcon}
        />
        <ProfileInfoItem
          label="Phone Number"
          textData={data?.phone ?? ""}
          imageSource={PhoneNumberIcon}
        />
      </View>

      <View
        style={{
          width: "100%",
          backgroundColor: colors.surface,
          paddingHorizontal: 12,
          paddingVertical: 11,
          gap: 13,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={[stylesBase.h3, { color: colors.textPrimary }]}>
            Account
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={[stylesBase.bodyBase, { color: colors.textPrimary }]}>
            Clear data
          </Text>
          <Image source={RightArrowIcon} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={[stylesBase.bodyBase, { color: colors.textPrimary }]}>
            Change password
          </Text>
          <Image source={RightArrowIcon} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={[stylesBase.bodyBase, { color: colors.error }]}>
            Delete account
          </Text>
          <Image source={RightArrowDestructiveIcon} />
        </View>
      </View>
    </SafeAreaView>
  );
}
