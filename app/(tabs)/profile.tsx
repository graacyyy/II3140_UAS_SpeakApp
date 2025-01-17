import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useAuth } from "@/context/useAuth";

export default function Home() {
  
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  });

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
    borderColor : "red",
    borderRadius : 16,
    borderWidth: 1,
    backgroundColor : "#fff",
    width : "100%",
  },
  logoutText: {
    fontSize: 16,
    color: "red",
    textAlign : "center",
    fontWeight: "bold",
  },
});
