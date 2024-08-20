import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export const useBiometricToViewRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (compatible) {
        const auth = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate with Face ID / Touch ID",
          fallbackLabel: "Enter Password",
        });

        setIsAuthenticated(auth.success);
      } else {
        setIsAuthenticated(false);
      }
    };

    authenticate();
  }, []);

  return { isAuthenticated };
};
