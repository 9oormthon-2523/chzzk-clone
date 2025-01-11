import { FollowInfo } from '@/app/_types/follow.type';
import { QueryClient, useQuery } from '@tanstack/react-query';

const getFollower = async (uid: string): Promise<FollowInfo[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/follow/${uid}`
  );
  return res.json();
};

export const prefetchFollower = async (uid: string) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['studio-follower', uid],
    queryFn: () => getFollower(uid),
  });

  return { queryClient };
};

export const useFollowerQuery = (uid: string) =>
  useQuery({
    queryKey: ['studio-follower', uid],
    queryFn: () => getFollower(uid),
  });
