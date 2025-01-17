import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/context/useAuth";

const BACKGROUND_COLOR = "#8A2BE2"; // Bright purple color

const categoryDescriptions: { [key: string]: string } = {
  grammar: "Test your knowledge of English grammar rules and structures.",
  vocabulary: "Expand your English vocabulary and learn new words.",
  writing: "Practice your English writing skills with various prompts.",
  reading: "Improve your reading comprehension with diverse texts.",
};

const StartQuiz: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { category } = useLocalSearchParams<{ category: string }>();

  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  });

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.push("/(tabs)")}
          accessibilityLabel="Go back"
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/green-book.png")}
          style={styles.image}
          accessibilityLabel="Green book icon"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{category}</Text>
        <Text style={styles.subtitle}>
          {categoryDescriptions[
            category as keyof typeof categoryDescriptions
          ] || "Improve your English skills with this quiz."}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            router.push({ pathname: "/quizscreen", params: { category } })
          }
          accessibilityLabel="Start quiz"
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back to previous screen"
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 20,
  },

  header: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 28,
  },
  imageContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1.6,
    resizeMode: "center",
  },
  textContainer: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    color: "white",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    lineHeight: 28,
    padding: 16,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: "center",
    padding: 20,
  },
  startButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "black",
  },
  backButton: {
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "white",
  },
});

export default StartQuiz;
