import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { menuItems } from "@/constants/menuItems";
import { useRouter } from "expo-router";

const ExploreScreen = () => {
  const router = useRouter();
  
  // @ts-ignore
  const handleItemPress = (route) => {
    router.push(route);
  };

  return (
    <LinearGradient
      colors={["#4F46E5", "#7C3AED"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 -mt-12">
        <ScrollView style={{ flex: 1 }}>
          {/* Header Section */}
          <View style={{ padding: 24 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "white" }}>
              Explore
            </Text>
            <Text style={{ color: "#E0E7FF", marginTop: 8, fontSize: 16 }}>
              Discover warehouse insights
            </Text>
          </View>

          {/* Search Bar */}
          <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
            <View style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}>
              <MaterialIcons name="search" size={24} color="#E0E7FF" />
              <Text style={{ 
                color: "#E0E7FF", 
                marginLeft: 12,
                fontSize: 16
              }}>
                Search inventory...
              </Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={{ padding: 24 }}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 20,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  overflow: "hidden"
                }}
                onPress={() => handleItemPress(item.route)}
              >
                <View style={{ 
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center"
                }}>
                  <View style={{
                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                    borderRadius: 12,
                    padding: 12,
                  }}>
                    <MaterialIcons name={item.icon} size={24} color="#E0E7FF" />
                  </View>
                  
                  <View style={{ marginLeft: 16, flex: 1 }}>
                    <Text style={{ 
                      color: "white",
                      fontSize: 18,
                      fontWeight: "600",
                      marginBottom: 4
                    }}>
                      {item.title}
                    </Text>
                    <Text style={{ 
                      color: "#E0E7FF",
                      fontSize: 14
                    }}>
                      {item.subtitle}
                    </Text>
                  </View>

                  <MaterialIcons 
                    name="chevron-right" 
                    size={24} 
                    color="#E0E7FF" 
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Stats */}
          <View style={{ padding: 24 }}>
            <Text style={{ 
              color: "white",
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 16
            }}>
              Quick Stats
            </Text>
            <View style={{ 
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 32,
            }}>
              <View style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 16,
                padding: 16,
                width: "48%",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.2)"
              }}>
                <Text style={{ color: "#E0E7FF", fontSize: 14 }}>
                  Total Items
                </Text>
                <Text style={{ 
                  color: "white",
                  fontSize: 24,
                  fontWeight: "bold",
                  marginTop: 8
                }}>
                  2,543
                </Text>
              </View>
              <View style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 16,
                padding: 16,
                width: "48%",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.2)"
              }}>
                <Text style={{ color: "#E0E7FF", fontSize: 14 }}>
                  Low Stock
                </Text>
                <Text style={{ 
                  color: "white",
                  fontSize: 24,
                  fontWeight: "bold",
                  marginTop: 8
                }}>
                  12
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ExploreScreen;
