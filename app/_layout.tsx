import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../App.css";
import { isLoggedIn } from "../services/auth";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const RootLayout = () => {
  const [authenticated, setAuthenticated] = React.useState<boolean | null>(
    null
  );

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isLoggedIn();
      setAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {authenticated === null ? (
        // Loading state
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="loading" />
        </Stack>
      ) : !authenticated ? (
        // Auth stack
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)/login" />
        </Stack>
      ) : (
        // Main app stack
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
          <Stack.Screen
            name="(products)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      )}
    </QueryClientProvider>
  );
};

export default RootLayout;
