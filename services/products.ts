import axios from "@/api/axios.config";

const API_URL = "/products";

export const fetchProducts = async (userId?: string) => {
  try {
    const response = await axios.get(API_URL);
    console.log("response.data", response.data);
    if (userId) {
      const ss = response.data.filter((product: any) => 
        product.editedBy?.some((edit: any) => edit.warehousemanId == userId)
      );

      console.log("filtered response", ss);

      return ss
    }
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error);
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error);
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
    throw new Error("Error fetching products: " + error);
  }
};


export const updateProduct = async (id: string, productData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error("Error updating product: " + error);
  }
};

export const updateProductQuantity = async ({
  productId,
  stockId,
  quantityChange,
}: {
  productId: string;
  stockId: number;
  quantityChange: number;
}) => {
  try {
    const product = await fetchProductById(productId);

    // Update the quantity in the specific stock
    const updatedStocks = product.stocks.map((stock: any) => 
      stock.id === stockId 
        ? { ...stock, quantity: quantityChange }
        : stock
    );

    const updatedProduct = await updateProduct(productId, {
      ...product,
      stocks: updatedStocks,
    }); 

    // Update statistics
    const allProductsResponse = await axios.get(API_URL);
    await updateStatistics(allProductsResponse.data);

    return updatedProduct;
  } catch (error) {
    throw new Error("Error updating product quantity:  " + error );
  }
};