import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProductForm = ({ onSubmit, initialData }) => {
    const [productName, setProductName] = useState(initialData ? initialData.name : '');
    const [productPrice, setProductPrice] = useState(initialData ? initialData.price : '');
    const [productDescription, setProductDescription] = useState(initialData ? initialData.description : '');

    const handleSubmit = () => {
        const productData = {
            name: productName,
            price: parseFloat(productPrice),
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
            />
            <Text style={styles.label}>Product Price</Text>
            <TextInput
                style={styles.input}
                value={productPrice}
                onChangeText={setProductPrice}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Product Description</Text>
            <TextInput
                style={styles.input}
                value={productDescription}
                onChangeText={setProductDescription}
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
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
});

export default ProductForm;