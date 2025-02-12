import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderSection } from '@/components/products/HeaderSection';
import { ProductForm } from '@/components/forms/ProductForm';
import { Product } from '@/types/product';
import { router } from 'expo-router';

const AddProductScreen = () => {
  const handleSubmit = async (data: Partial<Product>) => {
    try {
      // Add your API call here to save the product
      console.log('Submitting product:', data);
      
      router.back();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <LinearGradient colors={["#4F46E5", "#7C3AED"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderSection 
          title="Add Product"
          showBackButton
        />
        <ProductForm onSubmit={handleSubmit} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddProductScreen;
