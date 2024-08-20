import { View, Text, Alert } from "react-native";
import { AppButton } from "./AppButton";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { useEffect } from "react";
import { router } from "expo-router";
import { useAppSelector } from "@/hooks/RTKHooks";

export const LoginWithBiometricButton = () => {
  const { isBiometricSupported, checkBiometricSupport, authenticate } =
    useBiometricAuth();

  // Get the accessToken from Redux state
  const accessToken = useAppSelector((store) => store.auth.accessToken);

  const handleBiometricLogin = async () => {
    const isAuthenticated = await authenticate();
    if (isAuthenticated) {
      if (!accessToken) {
        Alert.alert("No session found", "Please login through email");
      } else {
        router.push("/home");
      }
    } else {
      Alert.alert(
        "Authentication Failed",
        "Please try again or use another login method."
      );
    }
  };

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  return (
    <View>
      {isBiometricSupported ? (
        <AppButton icon="line-scan" onPress={handleBiometricLogin} color={""}>
          Login with Face ID
        </AppButton>
      ) : (
        <Text className="text-white text-sm">
          Biometric authentication is not supported on this device.
        </Text>
      )}
    </View>
  );
};
