import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface HeaderSectionProps {
  title: string;
  showAddButton?: boolean;
  onAddPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const HeaderSection = ({
  title,
  showBackButton = false,
  onBackPress = () => router.back(),
}: HeaderSectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  addButtonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "600",
  },
});
