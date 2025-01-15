import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';

interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'text-input';
  options?: string[];
  answer: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Which one is countable? And, which one is uncountable?',
    type: 'multiple-choice',
    options: ['Bread', 'Student', 'Sand', 'Book', 'Shirt', 'Milk'],
    answer: 'Student', // This is simplified - you might want to handle multiple answers
  },
  {
    id: 2,
    text: 'How long has the applicant been working in marketing?',
    type: 'text-input',
    answer: '', // Define the correct answer here
  },
  // Add more questions as needed
];

interface QuizScreenProps {
  navigation: any;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [textAnswer, setTextAnswer] = useState('');

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setTextAnswer('');
    } else {
      // Handle quiz completion
      navigation.navigate('QuizResults');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer('');
      setTextAnswer('');
    } else {
      navigation.goBack();
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    if (question.type === 'multiple-choice') {
      return (
        <View style={styles.optionsContainer}>
          {question.options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === option && styles.selectedOption,
              ]}
              onPress={() => setSelectedAnswer(option)}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === option && styles.selectedOptionText
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
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
  },
  questionCard: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  questionNumber: {
    fontSize: 20,
    color: '#8A2BE2',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#8A2BE2',
    borderColor: '#8A2BE2',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: 'white',
  },
  textInput: {
    margin: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 10,
    fontSize: 16,
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
  },
});

export default QuizScreen;
