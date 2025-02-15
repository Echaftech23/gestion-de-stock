import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  query: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export function SearchBar({ query, onChangeText, onClear }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={query}
          onChangeText={onChangeText}
          placeholderTextColor="white"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  searchIcon: {
    marginRight: 10,
    color: "white",
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    height: "100%",
    paddingVertical: 8,
    color: "white",
  },
  clearButton: {
    padding: 4,
  },
});