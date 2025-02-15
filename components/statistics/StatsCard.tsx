import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  gradientColors?: string[];
  onPress?: () => void;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradientColors = ['#4F46E5', '#7C3AED'],
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.cardWrapper}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={gradientColors}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconWrapper}>
          <View style={styles.iconContainer}>
            <MaterialIcons name={icon} size={24} color="#fff" />
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
          {subtitle && (
            <View style={styles.subtitleContainer}>
              <MaterialIcons name="trending-up" size={16} color="#4ADE80" />
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: Dimensions.get('window').width / 2 - 24,
    margin: 8,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    height: 160,
  },
  iconWrapper: {
    marginBottom: 16,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#4ADE80',
    marginLeft: 4,
  },
});

export default StatisticsCard;
