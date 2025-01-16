import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';
import { useRouter } from 'expo-router';

interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'multiple-select' | 'text-input';
  options?: string[];
  answer: string | string[];
  multipleCorrect?: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Which is the correct sentence?',
    type: 'multiple-choice',
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
  {
    id: 3,
    text: 'Which words are prepositions?',
    type: 'multiple-select',
    options: [
      'in',
      'run',
      'under',
      'happy',
      'between',
      'at'
    ],
    answer: ['in', 'under', 'between', 'at'],
    multipleCorrect: true
  },
  {
    id: 4,
    text: 'Choose the correct form of "to be":',
    type: 'multiple-choice',
    options: [
      'She am happy.',
      'She are happy.',
      'She is happy.',
      'She be happy.'
    ],
    answer: 'She is happy.'
  },
  {
    id: 5,
    text: 'Select all proper nouns:',
    type: 'multiple-select',
    options: [
      'London',
      'city',
      'John',
      'book',
      'Monday',
      'France'
    ],
    answer: ['London', 'John', 'Monday', 'France'],
    multipleCorrect: true
  }
];

const QuizScreen = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  const handleAnswerSelect = (option: string) => {
    const question = questions[currentQuestion];
    
    if (question.type === 'multiple-select') {
      setSelectedAnswers(prev => 
        prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option]
      );
    } else {
      setSelectedAnswer(option);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setSelectedAnswers([]);
      setTextAnswer('');
    } else {
      router.push({
        pathname: '/(quiz)/quizresults',
        params: {
          score: 3,
          totalQuestions: questions.length
        }
      });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer('');
      setTextAnswer('');
    } else {
      router.goBack();
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    if (question.type === 'multiple-choice' || question.type === 'multiple-select') {
      return (
        <View style={styles.optionsContainer}>
          {question.options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                question.type === 'multiple-select'
                  ? selectedAnswers.includes(option) && styles.selectedOption
                  : selectedAnswer === option && styles.selectedOption,
              ]}
              onPress={() => handleAnswerSelect(option)}
            >
              <Text style={[
                styles.optionText,
                question.type === 'multiple-select'
                  ? selectedAnswers.includes(option) && styles.selectedOptionText
                  : selectedAnswer === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return (
        <TextInput
          style={styles.textInput}
          placeholder="Type Here...."
          value={textAnswer}
          onChangeText={setTextAnswer}
          multiline
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grammar</Text>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1}
        </Text>
        <Text style={styles.questionText}>
          {questions[currentQuestion].text}
        </Text>
      </View>

      {/* Answer Section */}
      {renderQuestion()}

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  closeButton: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  questionCard: {
    marginTop: 32,
    marginBottom: 24,
    marginHorizontal: 32,
    paddingVertical: 36,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#CDD2D8',
    alignItems: 'center',
  },
  questionNumber: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#8A2BE2',
    marginBottom: 10,
    justifyContent: 'center',
  },
  questionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CDD2D8',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#F1EBFF',
    borderColor: '#7534FF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter_400Regular',
  },
  selectedOptionText: {
    color: '#7534FF',
  },
  textInput: {
    marginHorizontal: 32,
    padding: 15,
    borderWidth: 1.6,
    borderColor: '#915DFF',
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },

  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#8A2BE2',
  },
  backButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#8A2BE2',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});

export default QuizScreen;
