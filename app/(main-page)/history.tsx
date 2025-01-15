import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import NavigationBar from '../components/navbar';

type HistoryDataItem = {
  type: string;
  timestamp: string;
  score: number;
};

const historyData: HistoryDataItem[] = Array(20).fill({
  type: 'Grammar',
  timestamp: '2024/03/02',
  score: 25,
});

const HistoryItem = ({ type, timestamp, score }: HistoryDataItem) => (
  <TouchableOpacity style={styles.historyItem}>
    <View style={styles.historyContent}>
      <Text style={styles.historyType}>{type}</Text>
      <Text style={styles.historyTimestamp}>{timestamp}</Text>
    </View>
    <View style={styles.scoreBadge}>
      <Text style={styles.scoreText}>{score}</Text>
    </View>
  </TouchableOpacity>
);

export default function History() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>speak.</Text>
          <Image 
            source={require('../../assets/images/profile-placeholder.png')}
            style={styles.profilePic}
          />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>Your learning journey and progress</Text>
        </View>

        {/* History List */}
        <FlatList
          data={historyData}
          renderItem={({ item }) => (
            <HistoryItem
              type={item.type}
              timestamp={item.timestamp}
              score={item.score}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.historyList}
        />
      </View>
      
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, // Space for navigation bar
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
    fontSize: 16,
    color: '#4B5563',
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  historyContent: {
    flex: 1,
  },
  historyType: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyTimestamp: {
    fontSize: 14,
    color: '#6B7280',
  },
  scoreBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  scoreText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});