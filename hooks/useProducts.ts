import { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { fetchProducts } from '../api/products.api';

const useProducts = () => {
    const { products, setProducts } = useContext(ProductContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [setProducts]);

    return { products, loading, error };
};

export default useProducts;