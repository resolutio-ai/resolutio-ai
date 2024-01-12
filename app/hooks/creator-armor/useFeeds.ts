import { getFeeds } from '@/app/services';
import { useQuery } from '@tanstack/react-query';

const useFeeds = () => {
  return useQuery({
    queryKey: ['getFeeds'],
    queryFn: getFeeds,
    select: (response) => response.data,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useFeeds;
