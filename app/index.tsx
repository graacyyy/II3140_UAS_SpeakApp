import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';


export default function LandingPage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/landing-page.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.mainHeading}>
            The easiest way to learn <Text style={styles.highlightText}>english</Text>. <Text>📚</Text>
          </Text>

          <Text style={styles.subHeading}>
            Learn english effectively and fun
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Link href="/signup" asChild>
            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/login" asChild>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    height: '50%',
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
  },
  highlightText: {
    color: '#8B5CF6',
  },
  subHeading: {
    fontSize: 20,
    color: '#64748B',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginTop: 20,
  },
  signUpButton: {
    backgroundColor: 'black',
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 18,
    borderRadius: 100,
    borderColor: '#8B5CF6',
    borderWidth: 2,
    alignItems: 'center',
  },
  loginText: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});