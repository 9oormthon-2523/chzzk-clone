import { createClient } from '@/app/_utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FollowActionType {
  uid: string;
  nickname: string;
}

const follow = async (props: FollowActionType) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase.from('follows').upsert({
    follower_id: user.id,
    following_id: props.uid,
  });

  if (!error) alert(`${props.nickname}님을 팔로우 하였습니다.`);
};

const unfollow = async (props: FollowActionType) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', user.id)
    .eq('following_id', props.uid);

  if (!error) alert(`${props.nickname}님을 팔로우 해제 하였습니다.`);
};

export const useFollowAction = () => {
  const queryClient = useQueryClient();

  const { mutate: followMutate } = useMutation({
    mutationKey: ['studio-follower'],
    mutationFn: ({ uid, nickname }: FollowActionType) => {
      return follow({ uid, nickname });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studio-follower'] });
    },
  });

  const { mutate: unfollowMutate } = useMutation({
    mutationKey: ['studio-follower'],
    mutationFn: ({ uid, nickname }: FollowActionType) => {
      return unfollow({ uid, nickname });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studio-follower'] });
    },
  });

  return { followMutate, unfollowMutate };
};
