import { Image, ScrollView, Text, View } from "react-native";

import { images } from "@/constants";

import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";
import { AppSafeAreaView, Button } from "@/components";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <AppSafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.hero}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-4xl text-white font-bold text-center">
              Discover The Future of Virtual Cards
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with OurBank
          </Text>

          <View className="mt-8 w-full">
            <Button
              buttonColor={theme.colors.secondary}
              onPress={() => router.push("/login")}
            >
              Continue with email
            </Button>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </AppSafeAreaView>
  );
}
