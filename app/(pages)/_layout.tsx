import { Stack } from "expo-router";
import { AppBar } from "@/components";

export default function PageLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          header: () => <AppBar title="Create card" />,
        }}
      />

      <Stack.Screen
        name="transaction-history"
        options={{
          header: () => <AppBar title="Transaction history" />,
        }}
      />

      <Stack.Screen
        name="card/[id]"
        options={{
          header: () => <AppBar title="Card details" />,
        }}
      />
    </Stack>
  );
}
