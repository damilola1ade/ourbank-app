import { View, Text } from "react-native";

import { AppSafeAreaView, LogoutButton } from "@/components";

const Profile = () => {
  return (
    <AppSafeAreaView>
      <View className="flex-row mt-5 px-4 justify-between items-center">
        <Text className="text-white text-3xl font-pbold">Profile</Text>
        <LogoutButton />
      </View>
    </AppSafeAreaView>
  );
};

export default Profile;
