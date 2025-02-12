import React from "react";
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#4F46E5", "#7C3AED"]}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1 mb-5">
          {/* Header Section */}
          <View style={{ padding: 24, paddingTop: 24 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "white" }}>
              YouStock
            </Text>
            <Text style={{ color: "#E0E7FF", marginTop: 8, fontSize: 16 }}>
              Welcome back, Manager
            </Text>
          </View>

          {/* Stats Cards */}
          <View style={{ padding: 24 }}>
            {/* Current Stock Card */}
            <TouchableOpacity 
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.1)", 
                borderRadius: 24,
                padding: 24,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.2)"
              }}
            >
              <View style={{ 
                backgroundColor: "rgba(99, 102, 241, 0.2)", 
                alignSelf: "flex-start",
                padding: 12,
                borderRadius: 16
              }}>
                <MaterialIcons name="inventory" size={28} color="#E0E7FF" />
              </View>
              <View style={{ marginTop: 16 }}>
                <Text style={{ color: "#E0E7FF", fontSize: 18, fontWeight: "500" }}>
                  Current Stock
                </Text>
                <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                  1,234
                </Text>
                <Text style={{ color: "#E0E7FF", fontSize: 14, marginTop: 8 }}>
                  +12.5% from last week
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {/* Pending Orders Card */}
              <TouchableOpacity 
                style={{ 
                  width: "48%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)", 
                  borderRadius: 24,
                  padding: 24,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
              >
                <View style={{ 
                  backgroundColor: "rgba(168, 85, 247, 0.2)", 
                  alignSelf: "flex-start",
                  padding: 12,
                  borderRadius: 16
                }}>
                  <MaterialIcons name="local-shipping" size={28} color="#E0E7FF" />
                </View>
                <View style={{ marginTop: 16 }}>
                  <Text style={{ color: "#E0E7FF", fontSize: 16, fontWeight: "500" }}>
                    Pending
                  </Text>
                  <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginTop: 8 }}>
                    56
                  </Text>
                  <Text style={{ color: "#E0E7FF", fontSize: 12, marginTop: 8 }}>
                    Orders
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Today's Activity Card */}
              <TouchableOpacity 
                style={{ 
                  width: "48%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)", 
                  borderRadius: 24,
                  padding: 24,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
              >
                <View style={{ 
                  backgroundColor: "rgba(59, 130, 246, 0.2)", 
                  alignSelf: "flex-start",
                  padding: 12,
                  borderRadius: 16
                }}>
                  <MaterialIcons name="trending-up" size={28} color="#E0E7FF" />
                </View>
                <View style={{ marginTop: 16 }}>
                  <Text style={{ color: "#E0E7FF", fontSize: 16, fontWeight: "500" }}>
                    Activity
                  </Text>
                  <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginTop: 8 }}>
                    89
                  </Text>
                  <Text style={{ color: "#E0E7FF", fontSize: 12, marginTop: 8 }}>
                    Today
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Quick Actions */}
            <View className="mt-4">
              <Text style={{ color: "white", fontSize: 20, fontWeight: "600", marginBottom: 16 }}>
                Quick Actions
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {[
                  { icon: "add-box", label: "Add Stock" },
                  { icon: "qr-code-scanner", label: "Scan Item" },
                  { icon: "assessment", label: "Reports" },
                  { icon: "settings", label: "Settings" }
                ].map((item, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={{ 
                      width: "48%",
                      backgroundColor: "rgba(99, 102, 241, 0.3)",
                      padding: 16,
                      borderRadius: 16,
                      marginBottom: 16,
                      borderWidth: 1,
                      borderColor: "rgba(99, 102, 241, 0.3)"
                    }}
                  >
                    <MaterialIcons name={item.icon} size={24} color="#E0E7FF" />
                    <Text style={{ color: "white", fontWeight: "500", marginTop: 8 }}>
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
