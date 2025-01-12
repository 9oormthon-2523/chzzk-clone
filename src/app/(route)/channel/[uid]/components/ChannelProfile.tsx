import { useState, useEffect } from 'react';
import { createClient } from '@/app/_utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useFollowAction } from '@/app/_store/queries/follow/mutation';

interface ChannelProfileProps {
  nickname: string;
  follower: number;
  context: string;
  img_url: string | null;
  is_following: boolean;
}

const ChannelProfile = ({ nickname, follower, context, img_url, is_following }: ChannelProfileProps) => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(is_following);
  const [followerCount, setFollowerCount] = useState<number>(follower);

  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const defaultImage = "/channelPage/blank_profile.svg";

  const { followMutate, unfollowMutate } = useFollowAction();

  const fetchLoggedInUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('로그인된 사용자 정보 가져오기 오류', error);
    } else {
      setLoggedInUserId(user?.id || null);
    }
  };

  const fetchFollowerCountAndStatus = async (channelId: string) => {
    try {
      const { count, error: countError } = await supabase
        .from('follows')
        .select('*', { count: 'exact' })
        .eq('following_id', channelId);

      if (countError) {
        throw new Error('팔로워 수 가져오기 오류: ' + countError.message);
      }
      setFollowerCount(count || 0);

      if (loggedInUserId) {
        const { data: followData, error: followError } = await supabase
          .from('follows')
          .select('*')
          .eq('follower_id', loggedInUserId)
          .eq('following_id', channelId)
          .single();

        if (followError && followError.code !== 'PGRST116') {
          throw new Error('팔로우 상태 확인 오류: ' + followError.message);
        }
        setIsFollowing(!!followData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
    if (params.uid) {
      const pageId = Array.isArray(params.uid) ? params.uid[0] : params.uid;
  
      if (loggedInUserId && pageId && loggedInUserId !== pageId) {
        fetchFollowerCountAndStatus(pageId);
      }
    }
  }, [params.uid, loggedInUserId]);

  const pageId = Array.isArray(params.uid) ? params.uid[0] : params.uid || ''; 
  const isLoggedInUser = loggedInUserId === pageId;

  const handleChannelStudioClick = () => {
    router.push(`/studio/${pageId}`);
  };

  const handleChannelManagementClick = () => {
    router.push(`/channel/${pageId}/settings`);
  };

  const handleFollow = () => {
    followMutate(
      { uid: pageId, nickname },
      {
        onSuccess: () => {
          setIsFollowing(true);
          setFollowerCount((prev) => prev + 1);
        },
        onError: (error) => {
          console.error('팔로우 오류:', error);
        },
      }
    );
  };

  const handleUnfollow = () => {
    unfollowMutate(
      { uid: pageId, nickname }, 
      {
        onSuccess: () => {
          setIsFollowing(false);
          setFollowerCount((prev) => Math.max(prev - 1, 0));
        },
        onError: (error) => {
          console.error('언팔로우 오류:', error);
        },
      }
    );
  };

  return (
    <div className="flex items-start justify-between max-w-7xl p-4 rounded-lg">
      <div className="flex items-center">
        <div className="w-24 h-24 rounded-full flex-shrink-0 shadow-md mr-4 relative">
          <Image 
            src={img_url || defaultImage} 
            alt={`${nickname} profile`} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-full" 
          />
        </div>
        <div className="flex-grow flex flex-col justify-center">
          <p className="text-2xl font-black">{nickname}</p>
          <p className="text-md font-semibold text-gray-500">팔로워 {followerCount}명</p>
          <p className="text-md font-medium text-gray-400">{context}</p>
        </div>
      </div>

      {isLoggedInUser ? (
        <div className="flex flex-row gap-2">
          <button 
            onClick={handleChannelStudioClick}
            className="p-3 h-9 border border-gray-300 hover:bg-gray-200 rounded-full flex items-center justify-center text-md font-black">
              <Image
                src="/channelPage/video.svg"
                alt="아이콘"
                width={24}
                height={24}
                className="mr-1"
              />
              방송하기
          </button>
          <button 
            onClick={handleChannelManagementClick}
            className="p-3 h-9 border border-gray-300 hover:bg-gray-200 rounded-full flex items-center justify-center text-md font-black">
              <Image
                src="/channelPage/setting.svg"
                alt="아이콘"
                width={24}
                height={24}
                className="mr-1"
              />
              채널 관리
          </button>
        </div>
      ) : (
        <button
          onClick={isFollowing ? handleUnfollow : handleFollow}
          className={`p-3 h-9 rounded-full flex items-center justify-center text-white font-black ${
            isFollowing ? 'bg-gray-400 hover:bg-gray-500' : 'bg-[#1bb373] hover:bg-[#178c5c]'
          }`}
        >
          <Image
            src="/channelPage/heart.svg"
            alt="아이콘"
            width={18}
            height={18}
            className="mr-1"
          />
          {isFollowing ? '팔로잉' : '팔로우'}
        </button>
      )}
    </div>
  );
};

export default ChannelProfile;
