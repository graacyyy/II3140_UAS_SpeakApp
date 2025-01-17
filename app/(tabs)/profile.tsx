import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session]);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Your Profile</Text>

        <View style={styles.profilePictureContainer}>
          <Image
            source={require("@/assets/images/profile-placeholder.png")}
            style={{ width: 160, height: 160, borderRadius: 120 }}
          />
        </View>

        <View style={styles.profileDetails}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{session?.user.user_metadata.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{session?.user.email}</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => supabase.auth.signOut()}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 36,
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
  },
  profileDetails: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
  },
  logoutButton: {
    alignSelf: "center",
    padding: 10,
  },
  logoutText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});
