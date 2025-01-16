import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
    return (
    <>
      <StatusBar style="dark" />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="login" options={{ headerShown: false}} />
        <Stack.Screen name="signup" options={{ headerShown: false}} />
        <Stack.Screen 
          name="(quiz)/quizscreen" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(quiz)/quizresults" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </>
  );
}