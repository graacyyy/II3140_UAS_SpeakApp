import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { quizService } from "@/lib/quizService";

interface HistoryItem {
  id: number;
  score: number;
  total_questions: number;
  completed_at: string;
  category: string;
}

const HistoryListItem = ({
  category,
  completed_at,
  score,
  total_questions,
}: HistoryItem) => (
  <View style={styles.historyItemContainer}>
    <TouchableOpacity style={styles.historyItem}>
      <View style={styles.historyContent}>
        <Text style={styles.historyType}>
          {category[0].toUpperCase() + category.slice(1)}
        </Text>
        <Text style={styles.historyTimestamp}>
          {new Date(completed_at).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.scoreBadge}>
        <Text style={styles.scoreText}>
          {score}/{total_questions}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default function History() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const attempts = await quizService.getQuizAttempts();
        setHistoryData(attempts);
      } catch (error) {
        console.error("Error loading history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>
            Your learning journey and progress
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.emptyState}>
            <Text>Loading...</Text>
          </View>
        ) : historyData.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No quiz attempts yet</Text>
          </View>
        ) : (
          <FlatList
            data={historyData}
            renderItem={({ item }) => <HistoryListItem {...item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F8F9FA",
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "column",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: "#4B5563",
  },
  historyItemContainer: {
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: "#000",
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
    fontWeight: "600",
    marginBottom: 4,
  },
  historyTimestamp: {
    fontSize: 14,
    color: "#6B7280",
  },
  scoreBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  scoreText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
  },
});
