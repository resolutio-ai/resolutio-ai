import { getFeeds } from '@/app/services/cms.service';
import { useQuery } from '@tanstack/react-query';

const useFeeds = () => {
  return useQuery({
    queryKey: ['getFeeds'],
    queryFn: getFeeds,
    select: (response) => response.data,
  });
};

export default useFeeds;
