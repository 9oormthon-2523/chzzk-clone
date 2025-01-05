import { createClient } from '../_utils/supabase/client';

interface FollowActionType {
  uid: string;
  nickname: string;
}

export const useFollowAction = () => {
  const supabase = createClient();

  const follow = async (props: FollowActionType) => {
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

  return { follow, unfollow };
};
