import React, { createContext, useContext, useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: number) => void;
    updateProduct: (updatedProduct: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const addProduct = (product: Product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };

    const removeProduct = (id: number) => {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts((prevProducts) =>
            prevProducts.map(product => (product.id === updatedProduct.id ? updatedProduct : product))
        );
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};