import { useNavigation } from "expo-router";
import { Appbar, useTheme } from "react-native-paper";

export const AppBar = ({ title }: { title: string }) => {
  const navigation = useNavigation();

  const theme = useTheme();

  return (
    <Appbar.Header
      style={{ backgroundColor: theme.colors.primary }}
      mode="center-aligned"
    >
      <Appbar.BackAction
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: "white" }}
        size={10}
      />
      <Appbar.Content
        title={title}
        titleStyle={{ color: "white", fontSize: 16 }}
      />
    </Appbar.Header>
  );
};
