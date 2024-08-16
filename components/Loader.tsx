import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { AppSafeAreaView } from "./SafeAreaView";

export const Loader = () => (
  <AppSafeAreaView>
    <View className="min-h-[85vh] bg-primary justify-center">
      <ActivityIndicator size="large" animating={true} color="white" />
    </View>
  </AppSafeAreaView>
);
