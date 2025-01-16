import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="(quiz)/quizscreen" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="(quiz)/quizresults" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}