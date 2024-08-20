import { AppSafeAreaView, UserAvatar } from "@/components";
import { useAppSelector } from "@/hooks/RTKHooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";

const Home = () => {
  const theme = useTheme();

  const { user } = useAppSelector((store) => store.auth);

  const [visible, setVisible] = useState(false);

  return (
    <AppSafeAreaView>
      <View className="mt-5 px-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-2">
            <UserAvatar onPress={() => router.push("/profile")} size={50} />
            <Text className="text-white text-lg font-pbold">
              Hi, {user?.name}
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <Ionicons name="settings-outline" size={20} color="white" />
            <Ionicons name="paper-plane-outline" size={20} color="white" />
            <Ionicons name="notifications" size={20} color="white" />
          </View>
        </View>

        <View className="bg-secondary w-full mt-6 p-4 rounded-2xl">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="cash" size={20} color="white" />
              <Button
                onPress={() => setVisible(!visible)}
                mode="text"
                className="-ml-3"
                labelStyle={{ color: "white" }}
                icon={visible ? "eye-off" : "eye"}
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Available Balance
              </Button>
            </View>
          </View>

          <View className="mt-6 flex-row justify-between items-center">
            {visible ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-white font-pregular text-xl tracking-tighter">
                  ₦
                </Text>
                <Text className="text-white font-pbold text-3xl tracking-tighter">
                  198,000.50
                </Text>
              </View>
            ) : (
              <Text className="text-white font-pbold text-3xl">****</Text>
            )}

            <Button
              mode="contained"
              className="bg-white w-[130px]"
              labelStyle={{ color: theme.colors.secondary }}
              icon="plus"
            >
              Fund account
            </Button>
          </View>
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default Home;
