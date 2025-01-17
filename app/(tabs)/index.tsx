import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "@/components/header";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";

export default function Home() {
  // const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!session) {
  //     router.replace("/");
  //   }
  // }, [session]);

  const handleQuizSelect = (
    category: "Grammar" | "Vocabulary" | "Reading" | "Writing"
  ) => {
    router.push({
      pathname: "/(quiz)/startquiz",
      params: { category },
    });
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Hello! 👋</Text>
          <Text style={styles.subtitle}>
            Welcome to your new learning space.
          </Text>
        </View>

        {/* Menu List */}
        <ScrollView>
          <TouchableOpacity
            style={[styles.card, styles.grammarCard]}
            onPress={() => handleQuizSelect("Grammar")}
          >
            <View>
              <Text style={styles.cardTitle}>Grammar</Text>
              <Text style={styles.cardDescription}>
                Learn the rules of perfect sentences by practice grammar
                essentials!
              </Text>
            </View>
            <Image
              source={require("@/assets/images/grammar-icons.png")}
              style={{ width: 56, height: 53.08 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.vocabularyCard]}
            onPress={() => handleQuizSelect("Vocabulary")}
          >
            <View>
              <Text style={styles.cardTitle}>Vocabulary</Text>
              <Text style={styles.cardDescription}>
                Discover new words and strengthen your vocabulary!
              </Text>
            </View>
            <Image
              source={require("@/assets/images/vocab-icons.png")}
              style={{ width: 56, height: 61.83 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.readingCard]}
            onPress={() => handleQuizSelect("Reading")}
          >
            <View>
              <Text style={styles.cardTitle}>Reading</Text>
              <Text style={styles.cardDescription}>
                Dive into engaging texts and sharpen your understanding of key
                ideas and details!
              </Text>
            </View>
            <Image
              source={require("@/assets/images/reading-icons.png")}
              style={{ width: 56, height: 56 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.writingCard]}
            onPress={() => handleQuizSelect("Writing")}
          >
            <View>
              <Text style={styles.cardTitle}>Writing</Text>
              <Text style={styles.cardDescription}>
                Practice creating polished sentences and cohesive paragraphs!
              </Text>
            </View>
            <Image
              source={require("@/assets/images/writing-icons.png")}
              style={{ width: 56, height: 56.31 }}
            />
          </TouchableOpacity>
        </ScrollView>
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
  cardsContainer: {
    gap: 16,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grammarCard: {
    backgroundColor: "#8B5CF6",
    marginBottom: 10,
  },
  vocabularyCard: {
    backgroundColor: "#3B82F6",
    marginBottom: 10,
  },
  readingCard: {
    backgroundColor: "#EC4899",
    marginBottom: 10,
  },
  writingCard: {
    backgroundColor: "#FF8800",
    marginBottom: 16,
  },
  cardTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDescription: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    maxWidth: 220,
  },
});
