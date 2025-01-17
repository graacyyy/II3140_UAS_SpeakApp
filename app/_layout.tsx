import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
    return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="login" options={{ headerShown: false}} />
      <Stack.Screen name="signup" options={{ headerShown: false}} />
      <Stack.Screen name="(quiz)" options={{ headerShown: false}} />
    </Stack>
  );
}