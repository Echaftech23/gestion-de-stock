import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, updateProduct, updateProductQuantity, fetchProducts } from '@/services/products';

export const useProductMutations = () => {
  const queryClient = useQueryClient();

  const fetchProductsMutation = useMutation({
    mutationFn: fetchProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: updateProductQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });

  return {
    createMutation,
    updateMutation,
    updateQuantityMutation,
  };
};