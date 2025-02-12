import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderSection } from '@/components/products/HeaderSection';
import { ProductForm } from '@/components/forms/ProductForm';
import { Product } from '@/types/product';
import { router } from 'expo-router';
import { createProduct } from '@/services/products';
import useProducts from '@/hooks/useProducts';

const AddProductScreen = () => {
  const { createProduct } = useProducts();

  const handleSubmit = async (data: Partial<Product>) => {
    try {
      await createProduct(data);
      router.back();
    } catch (error) {
      console.error('Error creating product:', error);
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
