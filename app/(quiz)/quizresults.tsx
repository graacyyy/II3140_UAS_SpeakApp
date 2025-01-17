import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import { useAuth } from "@/context/useAuth";

const QuizResultsScreen = () => {
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  });

  const { userAnswers, questions, category, score, totalQuestions } =
    useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  const handleViewAnswers = () => {
    // console.log("Passing data:", {
    //   userAnswers,
    //   questions,
    //   category,
    // });

    router.push({
      pathname: "/answers",
      params: {
        userAnswers,
        questions,
        category,
      },
    });
  };

  const handleGoBackHome = () => {
    router.push("/");
  };

  const parsedScore = score ? Number.parseInt(score as string) : 0;
  const parsedTotalQuestions = totalQuestions
    ? Number.parseInt(totalQuestions as string)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category || "Unknown Category"}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.score}>
          ⭐ {parsedScore}/{parsedTotalQuestions}
        </Text>
        <View style={styles.emojiContainer}>
          <Image
            source={require("../../assets/images/star-face-emoji.png")}
            style={styles.emoji}
          />
        </View>
        <Text style={styles.title}>Good Job!</Text>
        <Text style={styles.subtitle}>
          Keep practicing to improve your fluency.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.finishButton}
          onPress={handleGoBackHome}
        >
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleViewAnswers}>
          <Text style={styles.seeAnswersText}>See Answers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7534FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
    color: "#ffffff",
  },
  closeButton: {
    fontSize: 24,
    color: "#ffffff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    backgroundColor: "#915DFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    color: "white",
    fontSize: 24,
    fontFamily: "Inter_700Bold",
  },
  emojiContainer: {
    marginVertical: 36,
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  buttonContainer: {
    padding: 20,
    gap: 20,
  },
  finishButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  finishButtonText: {
    color: "#8A2BE2",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  seeAnswersText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Inter_700Bold",
  },
});

export default QuizResultsScreen;
