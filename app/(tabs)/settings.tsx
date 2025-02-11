// app/(tabs)/settings.tsx
import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { logoutUser } from "../../services/auth";

const SettingsScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/(auth)/login");
  };

  return (
    <LinearGradient colors={["#6190E8", "#A7BFE8"]} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your preferences</Text>
        </View>

        <View style={styles.settingsContainer}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.settingItem}>
              <MaterialIcons name={item.icon} size={24} color="#2563EB" />
              <Text style={styles.settingText}>{item.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#64748B" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="#93291E" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const settingsItems = [
  { title: "Account Settings", icon: "person" },
  { title: "Notifications", icon: "notifications" },
  { title: "Security", icon: "security" },
  { title: "Help & Support", icon: "help" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#E0E7FF",
  },
  settingsContainer: {
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  logoutText: {
    color: "#93291E",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 16,
  },
});

export default SettingsScreen;
