import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#7B2D5E" },
          headerTintColor: "#FDF7F2",
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: "#FDF7F2" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Auraa" }} />
        <Stack.Screen name="analyze" options={{ title: "Color Analysis" }} />
        <Stack.Screen name="results" options={{ title: "Your Palette" }} />
        <Stack.Screen name="wardrobe" options={{ title: "My Wardrobe" }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
