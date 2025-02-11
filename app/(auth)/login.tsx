import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { authenticateUser } from "../../services/auth";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const [secretKey, setSecretKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    if (!secretKey.trim()) {
      Alert.alert("Error", "Please enter your secret key");
      return;
    }

    setIsLoading(true);
    animateButton();

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0F172A", "#6190E8", "#A7BFE8"]}
        style={styles.gradientContainer}
      >
        <View className="flex-1 items-center justify-center p-5">
          <Image
            source={require('../../assets/images/logo.jpg')}            
            className="rounded-full w-[120px] h-[120px] mb-5"
            resizeMode="cover"
          />
          <Text className="text-4xl font-bold text-white mb-2">YouStock</Text>
          <Text className="text-lg text-white">Warehouse Management System</Text>
        </View>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Welcome Back! 👋</Text>
        <Text style={styles.loginText}>Login to continue</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="vpn-key"
            size={24}
            color="#6B7280"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your secret key"
            placeholderTextColor="#9CA3AF"
            value={secretKey}
            onChangeText={setSecretKey}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.9}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loginButtonText}>Signing In...</Text>
              </View>
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by SmartStock™</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  gradientContainer: {
    height: "45%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  subtitle: {
    fontSize: 16,
    color: "#E0E7FF",
    letterSpacing: 0.5,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#FFFFFF",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  loginText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    height: 60,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: "#6190E8",
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#020202",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    position:"absolute",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
    zIndex:10
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    zIndex: 0,
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    color: "#6B7280",
    fontSize: 14,
  },
});

export default LoginScreen;
