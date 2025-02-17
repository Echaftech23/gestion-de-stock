import axios from "@/api/axios.config";

const API_URL = "/products";

export const fetchProducts = async (userId?: string) => {
  try {
    const response = await axios.get(API_URL);
    if (userId) {
      return response.data.filter((product: any) => 
        product.editedBy?.some((edit: any) => edit.warehousemanId === userId)
      );
    }
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
};

const updateStatistics = async (products: any[]) => {
  const totalProducts = products.length;
  const outOfStock = products.filter((product) => 
    product.stocks.reduce((acc: number, stock: any) => acc + stock.quantity, 0) === 0
  ).length;
  const totalStockValue = products.reduce((acc: number, product) => 
    acc + product.stocks.reduce((stockAcc: number, stock: any) => stockAcc + stock.quantity, 0), 0
  );

  await axios.put(`/statistics`, {
    totalProducts,
    outOfStock,
    totalStockValue,
  });
};

export const createProduct = async (productData: any) => {
  try {
    const response = await axios.post(API_URL, productData);
    const allProductsResponse = await axios.get(API_URL);
    await updateStatistics(allProductsResponse.data);
    return response.data;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};


export const updateProduct = async (id: string, productData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};

export const updateProductQuantity = async ({
  productId,
  quantityChange,
}: {
  productId: string;
  quantityChange: number;
}) => {
  try {
    const response = await axios.patch(`${API_URL}/${productId}/quantity`, {
      quantityChange,
    });
    const allProductsResponse = await axios.get(API_URL);
    await updateStatistics(allProductsResponse.data);
    return response.data;
  } catch (error) {
    throw new Error("Error updating product quantity: " + error.message);
  }
};
