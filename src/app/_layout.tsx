import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#242329" } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
    </Stack>
  )
}
