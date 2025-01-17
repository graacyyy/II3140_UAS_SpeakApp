import { AuthProvider } from "@/context/useAuth";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <AuthProvider>
      <SafeAreaView style={{
        flex : 1,
        backgroundColor : "#000"
      }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(quiz)" options={{ headerShown: false }} />
      </Stack>
      </SafeAreaView>
    </AuthProvider>
  );
}
