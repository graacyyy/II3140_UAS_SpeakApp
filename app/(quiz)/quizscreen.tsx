import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import { quizService } from "@/lib/quizService";
import { useAuth } from "@/context/useAuth";

interface Question {
  id: number;
  text: string;
  type: "single-select" | "text-input" | "multiple-select";
  options?: string[];
  answer: string | string[];
  multipleCorrect?: boolean;
}

export default function QuizScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const questions = await quizService.getQuestionsByCategory(
        category.toLowerCase() as string
      );
      setQuestions(questions);
    };

    loadQuestions();
  }, [category]);

  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | string[];
  }>({});

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleBack = () => {
    router.back();
  };

  const handleNext = async () => {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (
      question.type === "single-select" &&
      selectedAnswer === question.answer
    ) {
      isCorrect = true;
    } else if (question.type === "multiple-select") {
      // Sort both arrays to ensure order doesn't matter
      const sortedUserAnswers = [...selectedAnswers].sort();
      const sortedCorrectAnswers = [...(question.answer as string[])].sort();

      console.log("Sorted user answers:", sortedUserAnswers);
      console.log("Sorted correct answers:", sortedCorrectAnswers);

      // Check if arrays have same length and all elements match
      isCorrect =
        sortedUserAnswers.length === sortedCorrectAnswers.length &&
        sortedUserAnswers.every(
          (answer, index) => answer === sortedCorrectAnswers[index]
        );
    } else if (
      question.type === "text-input" &&
      textAnswer.toLowerCase() === (question.answer as string).toLowerCase()
    ) {
      isCorrect = true;
    }

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      if (currentQuestion === questions.length - 1) {
        await handleFinish(score + 1, {
          ...userAnswers,
          [question.id]:
            question.type === "multiple-select"
              ? selectedAnswers
              : question.type === "text-input"
              ? textAnswer
              : selectedAnswer,
        });
      }
    }

    setUserAnswers((prev) => ({
      ...prev,
      [question.id]:
        question.type === "multiple-select"
          ? selectedAnswers
          : question.type === "text-input"
          ? textAnswer
          : selectedAnswer,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setSelectedAnswers([]);
      setTextAnswer("");
    } else {
      if (!isCorrect) {
        await handleFinish(score, userAnswers);
      }
    }
  };

  const handleFinish = async (
    num: number,
    ua: {
      [key: number]: string | string[];
    }
  ) => {
    try {
      await quizService.saveQuizAttempt({
        category,
        score: num,
        totalQuestions: questions.length,
        // userAnswers: ua,
      });

      router.push({
        pathname: "/quizresults",
        params: {
          score: num.toString(),
          totalQuestions: questions.length.toString(),
          userAnswers: encodeURIComponent(JSON.stringify(ua)),
          questions: encodeURIComponent(JSON.stringify(questions)),
          category,
        },
      });
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
    }
  };

  const renderQuestion = () => {
    if (questions.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No questions available for this category.
          </Text>
        </View>
      );
    }

    const question = questions[currentQuestion];
    return (
      <View>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.type === "single-select" && (
          <View>
            {question.options?.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.selectedOption,
                ]}
                onPress={() => setSelectedAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {question.type === "multiple-select" && (
          <View>
            {question.options?.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedAnswers.includes(option) && styles.selectedOption,
                ]}
                onPress={() => {
                  if (selectedAnswers.includes(option)) {
                    setSelectedAnswers(
                      selectedAnswers.filter((a) => a !== option)
                    );
                  } else {
                    setSelectedAnswers([...selectedAnswers, option]);
                  }
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {question.type === "text-input" && (
          <TextInput
            style={styles.textInput}
            value={textAnswer}
            onChangeText={setTextAnswer}
            multiline
          />
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <Text style={styles.progressText}>
          {questions.length > 0
            ? `${currentQuestion + 1}/${questions.length}`
            : ""}
        </Text>
      </View>
      {renderQuestion()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  progressText: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: "#8A2BE2",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontFamily: "Inter_400Regular",
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  questionText: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    marginBottom: 20,
    padding: 16,
  },
  optionButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  selectedOption: {
    backgroundColor: "#e6e6e6",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
    marginHorizontal: 16,
    marginBottom: 16,
    fontFamily: "Inter_400Regular",
  },
  nextButton: {
    backgroundColor: "#8A2BE2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
});
