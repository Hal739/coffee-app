import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import version from "@/package.json";

const Settings = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>アプリ情報</Text>
        <TouchableOpacity onPress={() => router.push("./licenses/Licenses")} style={styles.sectionContainer}>
            <Text style={styles.sectionItem}>ライセンス</Text>
            <AntDesign name="right" size={16} color="black" />
        </TouchableOpacity>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionItem}>バージョン</Text>
          <Text >{version.version}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: "#555",
  },
  sectionItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  packageName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  licenseText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
});

export default Settings;
