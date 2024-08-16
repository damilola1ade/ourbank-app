import { ButtonProps } from "@/types";
import { Button } from "react-native-paper";

export const AppButton = ({
  children,
  onPress,
  isLoading,
  isDisabled,
  color,
}: ButtonProps) => {
  return (
    <Button
      className={`${color} w-full justify-center rounded-xl`}
      labelStyle={{ fontSize: 16, color: "white", height: 25, marginTop: 16 }}
      onPress={onPress}
      loading={isLoading}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};
