import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 0 : 16,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 24,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#94A3B8", 
        headerStyle: {
          backgroundColor: "#4F46E5",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: Platform.OS === 'ios' ? 100 : 100,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20,
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={80}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 24,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          headerTitle: "SmartStock",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
