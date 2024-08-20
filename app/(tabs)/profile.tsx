import { useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { Chip, Divider, FAB } from "react-native-paper";
import { AppSafeAreaView, LogoutButton, UserAvatar } from "@/components";
import { useAppSelector } from "@/hooks/RTKHooks";
import { useBiometricToViewRoute } from "@/hooks/useBiometricToViewRoute";
import { router } from "expo-router";

export default function Profile() {
  const { user } = useAppSelector((store) => store.auth);

  const { name, email, gender, phone, dob, address } = user;

  const { isAuthenticated } = useBiometricToViewRoute();

  const profileDetails = [
    { label: "Full name", value: name },
    {
      label: "Email",
      value: (
        <View className="flex-row gap-2">
          <Chip
            className="bg-green-400 rounded-3xl"
            textStyle={{ color: "white", fontSize: 12 }}
            compact
          >
            Verified
          </Chip>
          <Text className="text-white font-pregular text-lg">{email}</Text>
        </View>
      ),
    },
    { label: "Mobile number", value: phone },
    { label: "Gender", value: gender },
    { label: "Date of birth", value: dob },
    { label: "Address", value: address },
  ];

  useEffect(() => {
    if (isAuthenticated === null) return;

    if (!isAuthenticated) {
      Alert.alert(
        "Authentication failed",
        "You are not authorized to view this card.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication is successful
  }

  return (
    <AppSafeAreaView>
      <View className="flex-row mt-5 px-4 justify-between items-center">
        <Text className="text-white text-3xl font-pbold">Profile</Text>
        <LogoutButton />
      </View>
      <ScrollView className="mt-16 px-3">
        <View className="items-center">
          <View className="relative">
            <UserAvatar size={125} onPress={() => {}} />
            <FAB
              icon="pencil"
              className="bg-white absolute bottom-0 right-0 rounded-full"
              size="small"
              onPress={() =>
                router.push({
                  pathname: "/(pages)/profile/[id]",
                  params: { id: user.id },
                })
              }
            />
          </View>
        </View>

        <View className="p-2 mt-12 space-y-4 rounded-2xl">
          {profileDetails.map((detail, index) => (
            <View className="space-y-6" key={index}>
              <View
                key={index}
                className="flex-row justify-between items-center"
              >
                <Text className="text-white font-pbold text-lg">
                  {detail.label}
                </Text>
                <Text className="text-white font-pregular text-lg">
                  {detail.value}
                </Text>
              </View>
              <Divider style={{ backgroundColor: "white" }} />
            </View>
          ))}
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
}
