import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderSection } from '@/components/products/HeaderSection';
import StatisticsCard from '@/components/statistics/StatsCard';

export default function StatisticsScreen() {
  return (
    <LinearGradient colors={["#4F46E5", "#7C3AED"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scroll}>
          <HeaderSection title="Statistics" />
          <StatisticsCard title={''} value={''} icon={'filter'} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
});