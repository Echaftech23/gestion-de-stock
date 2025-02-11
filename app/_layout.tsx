// app/_layout.tsx
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { Slot } from "expo-router";
import { isLoggedIn } from "../services/auth";

const RootLayout = () => {
  const [authenticated, setAuthenticated] = React.useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isLoggedIn();
      setAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  // Show loading screen while checking authentication
  if (authenticated === null) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="loading" />
      </Stack>
    );
  }

  // Show auth stack if not authenticated
  if (authenticated === false) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)/login" />
      </Stack>
    );
  }

  // Show main app stack if authenticated
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0F172A",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="loading"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
