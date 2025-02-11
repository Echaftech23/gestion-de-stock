import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsCardProps {
    title: string;
    value: number | string;
    description?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 24,
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});

export default StatsCard;