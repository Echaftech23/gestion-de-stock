import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput } from './FormInput';
import { Stock } from '@/types/product';

interface StockFormProps {
  stock: Partial<Stock>;
  onChange: (stock: Partial<Stock>) => void;
  errors?: Record<string, string>;
}

export const StockForm = ({ stock, onChange, errors = {} }: StockFormProps) => {
  return (
    <View style={styles.container}>
      <FormInput
        label="Warehouse Name"
        value={stock.name || ''}
        onChangeText={(text) => onChange({ ...stock, name: text })}
        error={errors.name}
      />
      <FormInput
        label="Quantity"
        value={stock.quantity?.toString() || ''}
        onChangeText={(text) => onChange({ ...stock, quantity: parseInt(text) || 0 })}
        keyboardType="numeric"
        error={errors.quantity}
      />
      <FormInput
        label="City"
        value={stock.localisation?.city || ''}
        onChangeText={(text) => 
          onChange({ 
            ...stock, 
            localisation: { ...stock.localisation, city: text } 
          })
        }
        error={errors.city}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
});
