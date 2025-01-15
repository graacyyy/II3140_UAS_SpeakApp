import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_500Medium } from '@expo-google-fonts/inter';

type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
};

type StartQuizProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const BACKGROUND_COLOR = '#8A2BE2'; // Bright purple color

const StartQuiz: React.FC<StartQuizProps> = ({ navigation }) => {
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
      {/* Close Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/images/green-book.png')} 
          style={styles.image}
          accessibilityLabel="Green book icon"
        />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Grammar</Text>
        <Text style={styles.subtitle}>
          Sharpen your grammar skills with this interactive quiz!
        </Text>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Quiz')}
          accessibilityLabel="Start quiz"
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
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
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 28,
  },
  imageContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1.6,
    resizeMode: 'center',
  },
  textContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: 'white',
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    lineHeight: 28,
    padding: 16,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    padding: 20,
  },
  startButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: 'black',
  },
  backButton: {
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: 'white',
  },
});

export default StartQuiz;