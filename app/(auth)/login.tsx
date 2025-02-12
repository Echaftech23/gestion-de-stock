import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { authenticateUser } from "../../services/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = () => {
  const [secretKey, setSecretKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!secretKey.trim()) {
      Alert.alert("Error", "Please enter your secret key");
      return;
    }

    setIsLoading(true);

    try {
      const user = await authenticateUser(secretKey);
      Alert.alert("Success", `Welcome back, ${user.name}! 👋`);
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Invalid secret key. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#4F46E5", "#7C3AED"]}
      style={{ flex: 1, zIndex: 10 }}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Header Section */}
            <View style={{ alignItems: "center", paddingTop: 60, paddingBottom: 40 }}>
              <Image
                source={require('../../assets/images/logo.jpg')}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  marginBottom: 24
                }}
                resizeMode="cover"
              />
              <Text style={{ 
                fontSize: 32,
                fontWeight: "bold",
                color: "white",
                marginBottom: 8
              }}>
                YouStock
              </Text>
              <Text style={{ 
                fontSize: 16,
                color: "#E0E7FF"
              }}>
                Warehouse Management System
              </Text>
            </View>

            {/* Login Form Section */}
            <View style={{ 
              flex: 1,
              zIndex: 55,
              backgroundColor: "white",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 24,
              
            }}>
              <Text style={{ 
                fontSize: 24,
                fontWeight: "700",
                color: "#1F2937",
                marginBottom: 8,
                marginTop: 20
              }}>
                Welcome Back! 👋
              </Text>
              <Text style={{ 
                fontSize: 16,
                color: "#6B7280",
                marginBottom: 32
              }}>
                Login to continue
              </Text>

              {/* Secret Key Input */}
              <View style={{
                backgroundColor: "#F9FAFB",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                marginBottom: 24
              }}>
                <View style={{
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  borderRadius: 12,
                  padding: 10,
                }}>
                  <MaterialIcons name="vpn-key" size={24} color="#6B7280" />
                </View>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: "#1F2937",
                    marginLeft: 16
                  }}
                  placeholder="Enter your secret key"
                  placeholderTextColor="#9CA3AF"
                  value={secretKey}
                  onChangeText={setSecretKey}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                style={{
                  backgroundColor: "#4F46E5",
                  borderRadius: 16,
                  padding: 16,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4
                }}
              >
                <Text style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600"
                }}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Text>
              </TouchableOpacity>

              {/* Footer */}
              <View style={{
                marginTop: 'auto',
                paddingBottom: 24,
                alignItems: "center"
              }}>
                <Text style={{ color: "#6B7280", fontSize: 14 }}>
                  Powered by SmartStock™
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

            
    </LinearGradient>
  );
};

export default LoginScreen;