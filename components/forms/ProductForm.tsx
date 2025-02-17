import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FormInput } from './FormInput';
import { StockForm } from './StockForm';
import { Product, Stock } from '@/types/product';
import { router } from 'expo-router';
import { validateProductForm } from "@/utils/validation";

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void;
}

export const ProductForm = ({ initialData = {}, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    type: '',
    barcode: '',
    price: 0,
    supplier: '',
    image: 'https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/8/a/8aa01aa.png',
    stocks: [],
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors = validateProductForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const addStock = () => {
    setFormData({
      ...formData,
      stocks: [
        ...(formData.stocks || []),
        {
          id: Date.now(),
          name: '',
          quantity: 0,
          localisation: { city: '', latitude: 0, longitude: 0 },
        },
      ],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <FormInput
        label="Product Name"
        value={formData.name || ''}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        error={errors.name}
      />

      <FormInput
        label="Type"
        value={formData.type || ''}
        onChangeText={(text) => setFormData({ ...formData, type: text })}
        error={errors.type}
      />

      <FormInput
        label="Barcode"
        value={formData.barcode || ''}
        onChangeText={(text) => setFormData({ ...formData, barcode: text })}
        error={errors.barcode}
      />

      <FormInput
        label="Price"
        value={formData.price?.toString() || ''}
        onChangeText={(text) => setFormData({ ...formData, price: parseFloat(text) || 0 })}
        keyboardType="numeric"
        error={errors.price}
      />

      <FormInput
        label="Supplier"
        value={formData.supplier || ''}
        onChangeText={(text) => setFormData({ ...formData, supplier: text })}
        error={errors.supplier}
      />

      <View style={styles.stocksContainer}>
        <Text style={styles.stocksTitle}>Stock Locations</Text>
        {formData.stocks?.map((stock, index) => (
          <StockForm
            key={stock.id}
            stock={stock}
            onChange={(updatedStock) => {
              const newStocks = [...(formData.stocks || [])];
              newStocks[index] = updatedStock as Stock;
              setFormData({ ...formData, stocks: newStocks });
            }}
            errors={errors}
          />
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addStock}>
          <Text style={styles.addButtonText}>Add Stock Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Product</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  stocksContainer: {
    marginTop: 24,
  },
  stocksTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 24,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});