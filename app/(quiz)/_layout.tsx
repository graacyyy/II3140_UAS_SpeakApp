import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="startquiz" options={{ headerShown: false}} />
      <Stack.Screen name="quizscreen" options={{ headerShown: false}} />
      <Stack.Screen name="quizresults" options={{ headerShown: false}} />
      <Stack.Screen name="answers" options={{ headerShown: false}} />
    </Stack>
  );
}