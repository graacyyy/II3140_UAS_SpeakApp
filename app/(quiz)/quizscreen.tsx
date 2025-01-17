import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';

interface Question {
  id: number;
  text: string;
  type: 'single-select' | 'text-input' | 'multiple-select';
  options?: string[];
  answer: string | string[];
  multipleCorrect?: boolean;
}

const questionsByCategory: { [key: string]: Question[] } = {
  Grammar: [
    {
      id: 1,
      text: 'Which is the correct sentence?',
      type: 'single-select',
      options: [
        'I am going to school yesterday.',
        'I went to school yesterday.',
        'I goes to school yesterday.',
        'I gone to school yesterday.'
      ],
      answer: 'I went to school yesterday.'
    },
    {
      id: 2,
      text: 'Select all correct plural forms:',
      type: 'multiple-select',
      options: [
        'childs',
        'children',
        'boxes',
        'mouses',
        'mice',
        'feet'
      ],
      answer: ['children', 'boxes', 'mice', 'feet'],
      multipleCorrect: true
    },
    // Add more grammar questions here...
  ],
  Vocabulary: [
    {
      id: 1,
      text: 'What is the synonym of "happy"?',
      type: 'single-select',
      options: ['Sad', 'Joyful', 'Angry', 'Tired'],
      answer: 'Joyful'
    },
    {
      id: 2,
      text: 'Write a sentence using the word "diligent".',
      type: 'text-input',
      answer: ''  // This will be evaluated manually or by more complex logic
    },
    // Add more vocabulary questions here...
  ],
  // Add more categories and questions as needed...
};

export default function QuizScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string | string[] }>({});

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });

  if (!fontsLoaded) return null;

  const questions = questionsByCategory[category as keyof typeof questionsByCategory] || [];

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (question.type === 'single-select' && selectedAnswer === question.answer) {
      isCorrect = true;
    } else if (question.type === 'multiple-select' && selectedAnswers.sort().join(',') === (question.answer as string[]).sort().join(',')) {
      isCorrect = true;
    } else if (question.type === 'text-input' && textAnswer.toLowerCase() === (question.answer as string).toLowerCase()) {
      isCorrect = true;
    }

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setUserAnswers(prev => ({
      ...prev,
      [question.id]: question.type === 'multiple-select' ? selectedAnswers : (question.type === 'text-input' ? textAnswer : selectedAnswer)
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setSelectedAnswers([]);
      setTextAnswer('');
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    console.log('Sending data:', {
      userAnswers,
      questions,
      category
    });

    router.push({
      pathname: '/quizresults',
      params: {
        score: score.toString(),
        totalQuestions: questions.length.toString(),
        userAnswers: encodeURIComponent(JSON.stringify(userAnswers)),
        questions: encodeURIComponent(JSON.stringify(questions)),
        category,
      }
    });
  };

  const renderQuestion = () => {
    if (questions.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No questions available for this category.</Text>
        </View>
      );
    }

    const question = questions[currentQuestion];
    return (
      <View>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.type === 'single-select' && (
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
        {question.type === 'multiple-select' && (
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
                    setSelectedAnswers(selectedAnswers.filter((a) => a !== option));
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
        {question.type === 'text-input' && (
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
          {questions.length > 0 ? `${currentQuestion + 1}/${questions.length}` : ''}
        </Text>
      </View>
      {renderQuestion()}
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
  progressText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#8A2BE2',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    marginBottom: 20,
    padding: 16,
  },
  optionButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  selectedOption: {
    backgroundColor: '#e6e6e6',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    marginHorizontal: 16,
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
  },
  nextButton: {
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 16,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
});