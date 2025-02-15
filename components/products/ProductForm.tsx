import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [productName, setProductName] = useState(initialData.name || "");
  const [productPrice, setProductPrice] = useState(initialData.price || "");
  const [barcode, setBarcode] = useState(initialData.barcode || "");
  const [productDescription, setProductDescription] = useState(
    initialData.description || ""
  );

  const handleSubmit = () => {
    if (!productName || !productPrice) {
      Alert.alert("Error", "Product name and price are required.");
      return;
    }

    const productData = {
      name: productName,
      price: parseFloat(productPrice),
      barcode: barcode,
      description: productDescription,
    };
    onSubmit(productData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="Enter product name"
      />
      <Text style={styles.label}>Product Price</Text>
      <TextInput
        style={styles.input}
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
        placeholder="Enter product price"
      />
      <Text style={styles.label}>Barcode</Text>
      <TextInput
        style={styles.input}
        value={barcode}
        onChangeText={setBarcode}
        placeholder="Enter barcode"
        editable={!initialData.barcode}
      />
      <Text style={styles.label}>Product Description</Text>
      <TextInput
        style={styles.input}
        value={productDescription}
        onChangeText={setProductDescription}
        placeholder="Enter product description"
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default ProductForm;