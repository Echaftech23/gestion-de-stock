import axios from '@/api/axios.config';

const API_URL = '/products';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
};

export const fetchProductById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching product: ' + error.message);
    }
};

export const createProduct = async (productData: any) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
};

export const updateProduct = async (id: string, productData: any) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, productData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

export const deleteProduct = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
};