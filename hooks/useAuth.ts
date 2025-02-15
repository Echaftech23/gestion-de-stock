import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authenticateUser, getCurrentUser, logoutUser } from '@/services/auth';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch the current user
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (user) => {
      queryClient.setQueryData(['currentUser'], user);
      router.push('/(tabs)');
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null);
      router.push('/login');
    },
  });

  return {
    user,
    isLoading,
    error,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  };
};

export default useAuth;