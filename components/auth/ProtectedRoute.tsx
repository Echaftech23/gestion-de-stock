import React from "react";
import { Stack } from "expo-router";
import { isLoggedIn } from "@/services/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isLoggedIn();
      setAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  if (authenticated === null) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="loading" />
      </Stack>
    );
  }

  if (!authenticated) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
      </Stack>
    );
  }

  return <>{children}</>;
}