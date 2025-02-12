import React from "react";
import { View, ScrollView, TouchableOpacity, SafeAreaView, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { settingsItems } from "@/constants/settingsItems";
import { logoutUser } from "@/services/auth";

const SettingsScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/(auth)/login");
  };

  return (
    <LinearGradient
      colors={["#4F46E5", "#7C3AED"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {/* Header */}
          <View style={{ padding: 24 }}>
            <Text style={{ 
              fontSize: 32, 
              fontWeight: "bold", 
              color: "white",
              marginBottom: 8
            }}>
              Settings
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: "#E0E7FF" 
            }}>
              Manage your preferences
            </Text>
          </View>

          {/* Profile Section */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 20,                
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.2)"
              }}
            >
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MaterialIcons name="account-circle" size={36} color="#E0E7FF" />
              </View>
              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
                  John Doe
                </Text>
                <Text style={{ color: "#E0E7FF", fontSize: 14, marginTop: 4 }}>
                  john.doe@example.com
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#E0E7FF" />
            </TouchableOpacity>
          </View>

          {/* Settings Items */}
          <View style={{ paddingHorizontal: 24 }}>
            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
              >
                <View style={{ 
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center"
                }}>
                  <View style={{
                    backgroundColor: item.color,
                    borderRadius: 12,
                    padding: 10,
                  }}>
                    <MaterialIcons name={item.icon} size={24} color="#E0E7FF" />
                  </View>
                  
                  <View style={{ marginLeft: 16, flex: 1 }}>
                    <Text style={{ 
                      color: "white",
                      fontSize: 16,
                      fontWeight: "600"
                    }}>
                      {item.title}
                    </Text>
                    <Text style={{ 
                      color: "#E0E7FF",
                      fontSize: 14,
                      marginTop: 2
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

            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                borderRadius: 16,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 24,
                marginBottom: 80,
                borderWidth: 1,
                borderColor: "rgba(239, 68, 68, 0.2)"
              }}
            >
              <View style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                borderRadius: 12,
                padding: 10,
              }}>
                <MaterialIcons name="logout" size={24} color="#FCA5A5" />
              </View>
              <Text style={{ 
                color: "#FCA5A5",
                fontSize: 16,
                fontWeight: "600",
                marginLeft: 16
              }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SettingsScreen;
