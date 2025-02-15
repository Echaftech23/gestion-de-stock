import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { StatisticsGrid } from "@/components/statistics/StatsGrid";
import { actionsItems } from "@/constants/actionsItems";
import { router } from "expo-router";

const HomeScreen = () => {
  const handleActionPress = (route: string) => {
    router.push(route);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#4F46E5", "#7C3AED"]} style={{ flex: 1 }}>
        <ScrollView className="flex-1 mb-5">
          
          {/* Header Section */}
          <StatisticsGrid />

          {/* Stats Cards */}
          <View style={{ padding: 20 }}>
            {/* Quick Actions */}
            <View className="mt-4">
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "600",
                  marginBottom: 16,
                }}
              >
                Quick Actions
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {actionsItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: "48%",
                      backgroundColor: "rgba(99, 102, 241, 0.3)",
                      padding: 16,
                      borderRadius: 16,
                      marginBottom: 16,
                      borderWidth: 1,
                      borderColor: "rgba(99, 102, 241, 0.3)",
                    }}
                    onPress={() => handleActionPress(item.route)}
                  >
                    <MaterialIcons name={item.icon} size={24} color="#E0E7FF" />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "500",
                        marginTop: 8,
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;
