import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/services/queryKeys';
import { fetchProducts, createProduct } from '@/services/products';

function useProducts() {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: [queryKeys.products],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {      
      queryClient.setQueryData([queryKeys.products], (oldProducts: Product[] | undefined) => {
        return oldProducts ? [...oldProducts, newProduct] : [newProduct];
      });
    },
  });

  return {
    products,
    isLoading,
    error,
    createProduct: createMutation.mutate,
  };
}

export default useProducts;