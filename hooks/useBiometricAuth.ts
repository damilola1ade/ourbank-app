import * as LocalAuthentication from "expo-local-authentication";
import { useState } from "react";

export const useBiometricAuth = () => {
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    setIsBiometricSupported(compatible && types.length > 0);
  };

  const authenticate = async () => {
    if (isBiometricSupported) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate",
        fallbackLabel: "Enter Password",
      });
      return result.success;
    }
    return false;
  };

  return { isBiometricSupported, checkBiometricSupport, authenticate };
};
