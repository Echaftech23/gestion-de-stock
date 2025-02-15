import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export function PaginationControls({
  page,
  totalPages,
  onNext,
  onPrev,
}: PaginationControlsProps) {
  const prevScale = new Animated.Value(1);
  const nextScale = new Animated.Value(1);

  const animateButton = (scale: Animated.Value) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePrev = () => {
    animateButton(prevScale);
    onPrev();
  };

  const handleNext = () => {
    animateButton(nextScale);
    onNext();
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={styles.blurContainer}>
        {/* Previous Button */}
        <Animated.View style={[{ transform: [{ scale: prevScale }] }]}>
          <TouchableOpacity
            onPress={handlePrev}
            disabled={page === 1}
            style={[styles.button, page === 1 && styles.buttonDisabled]}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={page === 1 ? "#94A3B8" : "#FFFFFF"}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Page Indicator */}
        <View style={styles.pageIndicatorContainer}>
          <Text style={styles.pageText}>
            Page <Text style={styles.currentPage}>{page}</Text> of {totalPages}
          </Text>

          {/* Optional: Page Dots for visual feedback */}
          <View style={styles.dotsContainer}>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
              const isActive = index === (page - 1) % 5;
              const opacity = isActive ? 1 : 0.3;

              return (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    { opacity },
                    isActive && styles.activeDot,
                  ]}
                />
              );
            })}
          </View>
        </View>

        {/* Next Button */}
        <Animated.View style={[{ transform: [{ scale: nextScale }] }]}>
          <TouchableOpacity
            onPress={handleNext}
            disabled={page === totalPages}
            style={[
              styles.button,
              page === totalPages && styles.buttonDisabled,
            ]}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={page === totalPages ? "#94A3B8" : "#FFFFFF"}
            />
          </TouchableOpacity>
        </Animated.View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  blurContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 8,
    overflow: "hidden",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  pageIndicatorContainer: {
    alignItems: "center",
  },
  pageText: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 8,
  },
  currentPage: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  },
  activeDot: {
    width: 12,
    backgroundColor: "#7C3AED",
  },
});
