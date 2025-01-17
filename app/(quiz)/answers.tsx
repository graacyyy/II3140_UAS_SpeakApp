import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';

interface Question {
  id: number;
  text: string;
  type: 'single-select' | 'text-input' | 'multiple-select';
  options?: string[];
  answer: string | string[];
  multipleCorrect?: boolean;
}

export default function AnswersScreen() {
  const router = useRouter();
  const { userAnswers, questions, category } = useLocalSearchParams();

  // Decode and parse the parameters
  const decodedUserAnswers = userAnswers ? JSON.parse(decodeURIComponent(userAnswers as string)) : {};
  const decodedQuestions = questions ? JSON.parse(decodeURIComponent(questions as string)) : [];

  // Add after the decode statements
  console.log('Decoded User Answers:', decodedUserAnswers);
  console.log('Decoded Questions:', decodedQuestions);

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

  // Update the isCorrectAnswer function to handle null/undefined
  const isCorrectAnswer = (question: Question, userAnswer: string | string[] | undefined) => {
    if (!userAnswer) return false;
    
    if (question.type === 'multiple-select') {
      const sortedUserAnswer = (userAnswer as string[]).sort();
      const sortedCorrectAnswer = (question.answer as string[]).sort();
      return JSON.stringify(sortedUserAnswer) === JSON.stringify(sortedCorrectAnswer);
    }
    return userAnswer === question.answer;
  };

  const renderOption = (option: string, isSelected: boolean, isCorrect: boolean) => {
    let backgroundColor = 'transparent';
    let borderColor = '#ccc';
    
    if (isSelected) {
      backgroundColor = isCorrect ? '#E8F5E9' : '#FFEBEE';
      borderColor = isCorrect ? '#4CAF50' : '#EF5350';
    } else if (isCorrect) {
      backgroundColor = '#F5F5F5';
      borderColor = '#4CAF50';
    }

    return (
      <View
        key={option}
        style={[
          styles.option,
          {
            backgroundColor,
            borderColor,
          },
        ]}
      >
        <Text style={[
          styles.optionText,
          isSelected && isCorrect && styles.correctText,
          isSelected && !isCorrect && styles.incorrectText,
        ]}>
          {option}
        </Text>
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
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {decodedQuestions.map((question: Question, index: number) => {
          const userAnswer = decodedUserAnswers[question.id];
          const isCorrect = isCorrectAnswer(question, userAnswer);

          return (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionNumber}>Question {index + 1}</Text>
              <Text style={styles.questionText}>{question.text}</Text>

              {question.type === 'single-select' && question.options && (
                <View style={styles.optionsContainer}>
                  {question.options.map((option) => renderOption(
                    option,
                    userAnswer === option,
                    option === question.answer
                  ))}
                </View>
              )}

              {question.type === 'multiple-select' && question.options && (
                <View style={styles.optionsContainer}>
                  {question.options.map((option) => renderOption(
                    option,
                    (userAnswer as string[])?.includes(option),
                    (question.answer as string[]).includes(option)
                  ))}
                </View>
              )}

              {question.type === 'text-input' && (
                <View style={styles.textInputContainer}>
                  <Text style={styles.answerLabel}>Your Answer:</Text>
                  <Text style={styles.textAnswer}>{userAnswer || 'No answer provided'}</Text>
                  <Text style={styles.answerLabel}>Correct Answer:</Text>
                  <Text style={styles.textAnswer}>{question.answer}</Text>
                </View>
              )}

              <View style={[
                styles.resultBadge,
                isCorrect ? styles.correctBadge : styles.incorrectBadge
              ]}>
                <Text style={styles.resultText}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionContainer: {
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionNumber: {
    fontSize: 16,
    color: '#8A2BE2',
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  correctText: {
    color: '#4CAF50',
  },
  incorrectText: {
    color: '#EF5350',
  },
  textInputContainer: {
    marginTop: 8,
  },
  answerLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#666',
    marginBottom: 4,
  },
  textAnswer: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 12,
  },
  resultBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  correctBadge: {
    backgroundColor: '#E8F5E9',
  },
  incorrectBadge: {
    backgroundColor: '#FFEBEE',
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#4CAF50',
  },
});