// app/(tabs)/explore.tsx
import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ExploreScreen = () => {
  return (
    <LinearGradient colors={["#6190E8", "#A7BFE8"]} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover warehouse insights</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <MaterialIcons name={item.icon} size={24} color="#2563EB" />
              <Text style={styles.menuText}>{item.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#64748B" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const menuItems = [
  { title: "Stock Analysis", icon: "analytics" },
  { title: "Inventory Reports", icon: "assessment" },
  { title: "Order History", icon: "history" },
  { title: "Suppliers", icon: "people" },
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
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  menuText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 16,
  },
});

export default ExploreScreen;
