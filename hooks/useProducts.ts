import useAuth  from './useAuth';
import { Product } from '@/types/product';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, createProduct, updateProduct, updateProductQuantity } from '@/services/products';

const useProducts = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch products
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', user?.id],
    queryFn: () => fetchProducts(user?.id),
    staleTime: 1000 * 60 * 5,
    enabled: !!user, // Only fetch if user is authenticated
  });

  console.log("useProducts hook - products:", products);
  console.log("useProducts hook - user:", user);

  // Create product mutation
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(['products'], (oldProducts: Product[] | undefined) => {
        return oldProducts ? [...oldProducts, newProduct] : [newProduct];
      });
    },
  });

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<Product>) => updateProduct(id, data),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (oldProducts: Product[] | undefined) => {
        return oldProducts?.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      });
    },
  });

  // Create product with user context
  const createProductWithUser = (productData: any) => {
    if (!user) {
      throw new Error('User must be logged in to create a product');
    }
    const productWithUser = {
      ...productData,
      editedBy: [
        {
          warehousemanId: user.id,
          at: new Date().toISOString(),
        },
      ],
    };
    createMutation.mutate(productWithUser);
  };

  // Update product with user context
  const updateProductWithUser = (productData: any) => {
    if (!user) {
      throw new Error('User must be logged in to update a product');
    }
    const productWithUser = {
      ...productData,
      editedBy: [
        ...(productData.editedBy || []),
        {
          warehousemanId: user.id,
          at: new Date().toISOString(),
        },
      ],
    };
    updateMutation.mutate(productWithUser);
  };

  // Update product quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: updateProductQuantity,
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (oldProducts: Product[] | undefined) => {
        return oldProducts?.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      });
    },
  });

  return {
    products,
    isLoading,
    error,
    createProduct: createProductWithUser,
    updateProduct: updateProductWithUser,
    updateProductQuantity: updateQuantityMutation.mutate,
  };
};

export default useProducts;