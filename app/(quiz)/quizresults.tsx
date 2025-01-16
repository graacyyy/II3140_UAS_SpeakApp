import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';

const QuizResults = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Add handleBack function
  const handleBack = () => {
    router.back();
  };

  // Provide default values if params are undefined
  const score = params.score || 3;
  const totalQuestions = params.totalQuestions || 5;

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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grammar</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.score}>⭐ {score}/{totalQuestions}</Text>
        <View style={styles.emojiContainer}>
          <Image 
            source={require('../../assets/images/star-face-emoji.png')} 
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
          onPress={() => router.push('/')}
        >
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.back()}
        >
          <Text style={styles.seeAnswersText}>See Answers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7534FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
    color: '#ffffff',
  },
  closeButton: {
    fontSize: 24,
    color: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    backgroundColor: '#915DFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  emojiContainer: {
    marginVertical: 36,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  buttonContainer: {
    padding: 20,
    gap: 20,
  },
  finishButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  seeAnswersText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
  },
});

export default QuizResults; 