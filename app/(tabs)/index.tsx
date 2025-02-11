import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={["#6190E8", "#A7BFE8"]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.title}>SmartStock</Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="inventory" size={32} color="#2563EB" />
            <Text style={styles.cardTitle}>Current Stock</Text>
            <Text style={styles.cardValue}>1,234</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="local-shipping" size={32} color="#2563EB" />
            <Text style={styles.cardTitle}>Pending Orders</Text>
            <Text style={styles.cardValue}>56</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="trending-up" size={32} color="#2563EB" />
            <Text style={styles.cardTitle}>Today's Activity</Text>
            <Text style={styles.cardValue}>89</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: "#E0E7FF",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardsContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: "#E0E7FF",
    fontSize: 16,
    marginTop: 12,
  },
  cardValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default HomeScreen;
