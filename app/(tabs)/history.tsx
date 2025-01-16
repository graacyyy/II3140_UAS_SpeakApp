import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Header from '@/components/header';

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
  <View style={styles.historyItemContainer}>
    <TouchableOpacity style={styles.historyItem}>
      <View style={styles.historyContent}>
        <Text style={styles.historyType}>{type}</Text>
        <Text style={styles.historyTimestamp}>{timestamp}</Text>
      </View>
      <View style={styles.scoreBadge}>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default function History() {
  return (
    <>
      <Header />
      <View style={styles.container}>
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
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column'
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
  historyItemContainer: {
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
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