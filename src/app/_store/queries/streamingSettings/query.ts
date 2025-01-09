import { StreamingQueryType } from '@/app/_types/streaming.type';
import { QueryClient, useQuery } from '@tanstack/react-query';

const getUserStreaming = async (uid: string): Promise<StreamingQueryType> => {
  const res = await fetch(`http://localhost:3000/api/user/streaming/${uid}`);
  return res.json();
};

export const prefetchUserStreaming = async (uid: string) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['user-streaming', uid],
    queryFn: () => getUserStreaming(uid),
  });

  return { queryClient };
};

export const useUserStreaming = (uid: string) =>
  useQuery({
    queryKey: ['user-streaming', uid],
    queryFn: () => getUserStreaming(uid),
  });
