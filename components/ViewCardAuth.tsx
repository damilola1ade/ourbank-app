import { Alert, View, Text } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { AppButton } from "./AppButton";
import { useEffect, useState } from "react";

enum authModeEnum {
  Local,
  Password,
  NoComp,
  Authenticate,
}

export const ViewCardAuth = () => {
  const [authMode, setAuthMode] = useState(authModeEnum.Local);

  // It is possible to hnave a state if their is an login operation going and then call this on every rerender. But I would not recommend it.
  useEffect(() => {
    onAuthenticate();
  }, []);

  async function onAuthenticate() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Touch ID",
        fallbackLabel: "Enter Password",
      });
      auth.success
        ? setAuthMode(authModeEnum.Authenticate)
        : setAuthMode(authModeEnum.Password);
    } else {
      setAuthMode(authModeEnum.NoComp);
    }
  }
};
