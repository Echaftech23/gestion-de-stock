import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductCard;