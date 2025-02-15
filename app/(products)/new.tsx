import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderSection } from '@/components/products/HeaderSection';
import { ProductForm } from '@/components/forms/ProductForm';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useProducts from '@/hooks/useProducts';
import { Alert } from 'react-native';

const AddProductScreen = () => {
  const { createProduct } = useProducts();
  const { barcode } = useLocalSearchParams<{ barcode?: string }>();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createProduct({ ...data, barcode });
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create product.');
    }
  };

  return (
    <LinearGradient colors={['#4F46E5', '#7C3AED']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderSection title="Add Product" showBackButton />
        <ProductForm onSubmit={handleSubmit} initialData={{ barcode }} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddProductScreen;