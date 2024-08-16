import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export const AppSafeAreaView = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView className="bg-primary h-[100%]">{children}</SafeAreaView>
  );
};
