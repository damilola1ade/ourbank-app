import { ButtonProps } from "@/types";
import { Button as PaperButton } from "react-native-paper";

export const Button = ({
  children,
  buttonColor,
  onPress,
  isLoading,
  isDisabled,
  className,
}: ButtonProps) => {
  return (
    <PaperButton
      buttonColor={buttonColor}
      className={className}
      contentStyle={{
        minHeight: 54,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      labelStyle={{ fontSize: 16, fontWeight: "bold", color: "white" }}
      mode="contained"
      onPress={onPress}
      loading={isLoading}
      disabled={isDisabled}
    >
      {children}
    </PaperButton>
  );
};
