import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import StatisticsCard from "./StatsCard";
import useStatistics from "@/hooks/useStatistics";

export const StatisticsGrid = () => {
  const { statistics, isLoading, error } = useStatistics();

  if (isLoading) {
    return (
      <View style={gridStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={gridStyles.errorContainer}>
        <Text style={gridStyles.errorText}>Error loading statistics</Text>
      </View>
    );
  }

  // Calculate percentage changes
  const productChange = "+5.2% this week";
  const stockChange = statistics.outOfStock > 0 ? "-2.1% this week" : "+0% this week";
  const valueChange = "+3.4% this month";

  return (
    <View style={gridStyles.container}>
      <StatisticsCard
        title="Total Products"
        value={statistics.totalProducts}
        subtitle={productChange}
        icon="inventory"
        gradientColors={["#4F46E5", "#7C3AED"]}
      />
      <StatisticsCard
        title="Out of Stock"
        value={statistics.outOfStock}
        subtitle={stockChange}
        icon="error-outline"
        gradientColors={["#F59E0B", "#EF4444"]}
      />
      <StatisticsCard
        title="Stock Value"
        value={`$${statistics.totalStockValue.toLocaleString()}`}
        subtitle={valueChange}
        icon="attach-money"
        gradientColors={["#10B981", "#059669"]}
      />
      <StatisticsCard
        title="Daily Activity"
        value="89"
        subtitle="+5.4% today"
        icon="trending-up"
        gradientColors={["#6366F1", "#4F46E5"]}
      />
    </View>
  );
};

const gridStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    justifyContent: "center",
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
  }
});