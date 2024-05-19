import { getFeeds } from '@/app/services';
import { useQuery } from '@tanstack/react-query';

const useFeeds = () => {
  const {
    data: feeds,
    isLoading: isFeedLoading,
    ...rest
  } = useQuery({
    queryKey: ['getFeeds'],
    queryFn: getFeeds,
    select: (response) => response.data,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { feeds, isFeedLoading, ...rest };
};

export default useFeeds;
