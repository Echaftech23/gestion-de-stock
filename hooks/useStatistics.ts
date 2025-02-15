import { useQuery } from '@tanstack/react-query';
import { fetchStatistics } from '@/services/statistics';

const useStatistics = () => {
  const { data: statistics = {}, isLoading, error } = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
    staleTime: 1000 * 60 * 5,
  });

  return {
    statistics,
    isLoading,
    error,
  };
};

export default useStatistics;