import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import NavigationBar from '../components/navbar';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>speak.</Text>
        <Image 
          source={require('../../assets/images/profile-placeholder.png')}
          style={styles.profilePic}
        />
      </View>

      {/* Welcome Section */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Hello! 👋</Text>
        <Text style={styles.subtitle}>Welcome to your new learning space.</Text>
      </View>

      {/* Learning Cards */}
      <View style={styles.cardsContainer}>
        {/* <Link href="./grammar" asChild> */}
          <TouchableOpacity style={[styles.card, styles.grammarCard]}>
            <View>
              <Text style={styles.cardTitle}>Grammar</Text>
              <Text style={styles.cardDescription}>Deskripsi Grammar dikit</Text>
            </View>
            <View style={styles.grammarIcon} />
          </TouchableOpacity>
        {/* </Link> */}
        
        {/* <Link href="./vocabulary" asChild> */}
          <TouchableOpacity style={[styles.card, styles.vocabularyCard]}>
            <View>
              <Text style={styles.cardTitle}>Vocabulary</Text>
              <Text style={styles.cardDescription}>Deskripsi Grammar dikit</Text>
            </View>
            <View style={styles.vocabularyIcon} />
          </TouchableOpacity>
        {/* </Link> */}

        {/* <Link href="../speaking" asChild> */}
          <TouchableOpacity style={[styles.card, styles.speakingCard]}>
            <View>
              <Text style={styles.cardTitle}>Speaking</Text>
              <Text style={styles.cardDescription}>Deskripsi Grammar dikit</Text>
            </View>
            <View style={styles.speakingIcon} />
          </TouchableOpacity>
        {/* </Link> */}
      </View>

      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDD',
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#4B5563',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grammarCard: {
    backgroundColor: '#8B5CF6',
  },
  vocabularyCard: {
    backgroundColor: '#EC4899',
  },
  speakingCard: {
    backgroundColor: '#3B82F6',
  },
  cardTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  grammarIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  vocabularyIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  speakingIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    transform: [{ rotate: '45deg' }],
  },
});