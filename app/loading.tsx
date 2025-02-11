import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import { Image } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0F172A", "#1E3A8A", "#2563EB"]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../assets/images/favicon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>SmartStock</Text>
          <Text style={styles.subtitle}>Warehouse Management System</Text>
          
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>

        <Text style={styles.footerText}>Powered by Youtock™</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#E0E7FF",
    letterSpacing: 0.5,
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 16,
    letterSpacing: 0.5,
  },
  footerText: {
    position: "absolute",
    bottom: 24,
    color: "#E0E7FF",
    fontSize: 14,
    opacity: 0.8,
  },
});

export default LoadingScreen;
